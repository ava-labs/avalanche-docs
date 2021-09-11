pragma solidity ^0.8.0;

import "ERC20.sol";
import "Ownable.sol";

contract stakedAVAX is ERC20, Ownable {

    uint256 public stakeNumber = 0;
    mapping(address => uint256[]) public currentStakedByUser;

    struct Stake {
        address payable user;
        uint256 stakeId;
        uint256 amount;
        uint256 finalAmount;
        uint256 endingTimestamp;
        bool withdraw;
        bool updated;
        bool redeemed;
        string PChainTx;
    }

    mapping(uint256 => Stake) public stakeds;
    uint256 public secondsInFuture = 14 * 24 * 3600;
    uint256 public maxSecondsInFuture = 365 * 24 * 3600;
    uint256 public secondsBeforeAllRedeem = 60 * 24 * 3600;
    uint256 public minimumValue = 25 ether;

    constructor() ERC20("stakedAVAX", "sAVAX") {

    }

    function stakeByUser(address user) public view returns (uint256[] memory toto){
        return currentStakedByUser[user];
    }

    function stake(uint256 timestamp) public payable {
        require(timestamp > block.timestamp + secondsInFuture, "Ending period not enough in the future");
        require(msg.value >= minimumValue, "Not enough avax for delegation");
        Stake storage s = stakeds[stakeNumber];
        s.stakeId = stakeNumber;
        s.amount = msg.value;
        s.endingTimestamp = timestamp;
        s.user = payable(msg.sender);
        currentStakedByUser[msg.sender].push(stakeNumber);
        _mint(msg.sender, msg.value);

        emit Staked(s.user, s.stakeId, msg.value, timestamp);
        stakeNumber++;
    }

    function updateStake(uint256 stakeId, uint256 finalAmount) public payable onlyOwner {
        require(msg.value >= finalAmount, "Not enough avax sent");
        Stake storage s = stakeds[stakeId];
        require(finalAmount >= s.amount, "final amount must be greater than deposited amount");
        s.finalAmount = finalAmount;
        s.updated = true;

        emit StakeEnded(stakeId, finalAmount);
    }

    function redeem(uint256 stakeId) public {
        Stake storage s = stakeds[stakeId];
        require(s.endingTimestamp > block.timestamp, "Staking period not ended");
        require(s.updated == true, "Stake not yet transferred on C-chain");
        require(s.redeemed == false, "Stake already redemeed");
        require(balanceOf(msg.sender) >= s.amount, "Not enough sAVAX on address");
        require(s.user == msg.sender || s.endingTimestamp > block.timestamp + secondsBeforeAllRedeem, "Not stake owner");
        s.redeemed = true;
        _burn(msg.sender, s.amount);
        require(payable(msg.sender).send(s.finalAmount), "Send failed");

        uint256 index;
        for (uint i = 0; i < currentStakedByUser[msg.sender].length; i++) {
            if (currentStakedByUser[msg.sender][i] == stakeId) {
                index = i;
                break;
            }
        }
        currentStakedByUser[msg.sender][index] = currentStakedByUser[msg.sender][currentStakedByUser[msg.sender].length - 1];
        delete currentStakedByUser[msg.sender][currentStakedByUser[msg.sender].length - 1];
        currentStakedByUser[msg.sender].pop();

        emit Redeem(stakeId, s.finalAmount);
    }

    function withdraw(uint256 stakeId) public onlyOwner {
        Stake storage s = stakeds[stakeId];
        require(s.withdraw == false, "Already Withdrawn");
        require(payable(msg.sender).send(s.amount), "Send failed");
        s.withdraw = true;

    }

    function setPChainTx(uint256 stakeId, string calldata h) public onlyOwner {
        Stake storage s = stakeds[stakeId];
        s.PChainTx = h;
    }

    function updateVariables(uint256 secondsF, uint256 maxSecondsF, uint256 secondsAll, uint256 minimum) public onlyOwner {
        maxSecondsInFuture = maxSecondsF;
        secondsInFuture = secondsF;
        secondsBeforeAllRedeem = secondsAll;
        minimumValue = minimum;
    }

    event Staked(address indexed user, uint256 stakeId, uint256 value, uint256 timestamp);

    event StakeEnded(uint256 stakeId, uint256 finalAmount);

    event Redeem(uint256 stakeId, uint256 finalAmount);
}