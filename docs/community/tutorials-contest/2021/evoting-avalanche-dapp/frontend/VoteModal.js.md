# VoteModal.js

``` jsx
import React, { useState } from "react";
import { Box, Flex, Modal, Button, Text, Card, Radio, Field, Loader } from "rimble-ui";

// Data like election and candidate details will be passed in the props by ActiveElections.js (parent)
function VoteModal(props) {
  // These are React Hooks and are used only for UX like opening and closing of Voting Modal and loaders
  const [isOpen, setIsOpen] = useState(false);
  const [loading, isLoading] = useState(false);

  // This Hook will be used to maintain the selected candidate ID by a voter
  const [cid, changeCid] = useState(0);

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const onRadioChange = (e) => {
    changeCid(e.target.value);
  };

  // vote() function would be used to transact a vote
  const vote = async (eid) => {
    isLoading(true);
    await props.election.contractInstance.methods.vote(cid).send({ from: props.election.account });
    isLoading(false);
  };

  let candid = [],
    candidVote = [];
  for (let i = 0; i < props.candidates.length; i++) {
    let candidDetail = props.candidates[i][1] + " (" + props.candidates[i][2] + ")";

    candid.push(
      <Radio
        name="candidate"
        key={i}
        label={candidDetail}
        my={2}
        value={props.candidates[i][0]}
        onChange={onRadioChange}
      />
    );

    candidVote.push(props.candidates[i][2]);
  }

  return (
    // This is a rimble-ui builtin modal for triggering vote() function
    <Box className="App" p={0}>
      <Box>
        <Button onClick={openModal}>Vote</Button>

        <Modal isOpen={isOpen}>
          <Card width={"420px"} p={0}>
            {/* Close icon to close the modal */}
            <Button.Text
              icononly
              icon={"Close"}
              color={"moon-gray"}
              position={"absolute"}
              top={0}
              right={0}
              mt={3}
              mr={3}
              onClick={closeModal}
            />

            {/* List of candidates with their vote count */}
            <Box p={4} mb={3}>
              <h3>{props.election.electionName}</h3>
              <Field label="Choose candidate from below">{candid}</Field>
            </Box>

            {/* Vote button to cast a vote */}
            <Flex
              px={4}
              py={3}
              borderTop={1}
              borderColor={"#E8E8E8"}
              justifyContent={"flex-end"}
            >
              {loading ? (
                <Loader size="40px" />
              ) : (
                <Button.Outline
                  onClick={() => {
                    vote(props.election.electionId);
                  }}
                >
                  Vote
                </Button.Outline>
              )}
            </Flex>
          </Card>
        </Modal>
      </Box>
    </Box>
  );
}

export default VoteModal;
```
