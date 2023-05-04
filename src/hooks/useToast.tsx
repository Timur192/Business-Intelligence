import { useToast } from "@chakra-ui/react";

interface ToastMessageProps {
  status: "success" | "error" | "warning";
  error?: string;
}

function useToasts() {
  const toast = useToast();

  function ShowToast({ status, error }: ToastMessageProps) {
    toast({
      title: status == "success" ? "Successfully" : `${error}`,
      position: "top-right",
      status: status,
      isClosable: true,
    });
  }

  return { ShowToast };
}

export default useToasts;
