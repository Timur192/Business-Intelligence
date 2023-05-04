import { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  Box,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormLabel,
  Input,
  InputGroup,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import useAuthentication from "../../hooks/useAuthentication";

interface IDrawer {
  visibility: boolean;
  setDrawerVisibility: (arg: boolean) => void;
}

function index({ visibility, setDrawerVisibility }: IDrawer) {
  const [name, setName] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Update } = useAuthentication();
  const firstField = useRef<any>();

  const CloseDrawer = () => {
    setDrawerVisibility(false);
  };

  const UpdateProfile = () => {
    Update({ name, urlImg });
    setDrawerVisibility(false);
  };

  useEffect(() => {
    if (visibility) {
      onOpen();
    } else {
      onClose();
    }
  }, [visibility]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={CloseDrawer}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Update Profile</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="username">Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={firstField}
                id="username"
                placeholder="Please enter user name"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="url">Photo Url</FormLabel>
              <InputGroup>
                <Input
                  value={urlImg}
                  onChange={(e) => setUrlImg(e.target.value)}
                  type="url"
                  id="url"
                  placeholder="Please enter domain"
                />
              </InputGroup>
            </Box>
          </Stack>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={CloseDrawer}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={UpdateProfile}>
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default index;
