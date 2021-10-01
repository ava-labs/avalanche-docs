import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

const main = async (): Promise<any> => {
    const Swapper = await ethers.getContractFactory("Swapper");
    // @ts-ignore
    const swapper = await Swapper.deploy(process.env.WAVAX_ADDRES);

    await swapper.deployed();

    console.log("Swapper deployed to:", swapper.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
