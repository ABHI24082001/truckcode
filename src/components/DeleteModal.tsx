import {AlertDialog, Box, Button, Heading} from 'native-base';
import React from 'react';
import {AppIcon} from './core';

type ModalType = {
  isOpen?: boolean;
  onClose?: any;
  title?: string;
  handelDelete?: () => void;
};

const DeleteModal = ({isOpen, onClose, title, handelDelete}: ModalType) => {
  const cancelRef = React.useRef(null);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}>
      <AlertDialog.Content py={5}>
        <AlertDialog.Body alignItems={'center'}>
          <AppIcon AntDesignName="warning" size={70} color={'#e11d48'} />
          <Heading fontSize={18} my={3} textAlign={'center'}>
            {title}
          </Heading>
        </AlertDialog.Body>

        <Box alignItems="center">
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={cancelRef}
              borderWidth={1}
              borderColor={'danger.500'}
              _text={{fontWeight: 600}}>
              No
            </Button>
            <Button colorScheme="danger" onPress={handelDelete}>
              Yes
            </Button>
          </Button.Group>
        </Box>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default DeleteModal;
