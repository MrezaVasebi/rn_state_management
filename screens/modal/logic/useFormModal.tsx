import { useState } from "react";
import { userType } from "../../../types";

interface IFromModal {
  onCloseModal: () => void;
  onSaveUser: (value: userType) => void;
}

export const useFormModal = (props: IFromModal) => {
  const [userInfo, setUserInfo] = useState<userType>({
    address: "",
    email: "",
    fullName: "",
    mobile: "",
    id: "",
  });

  function setValues(identifier: string, value: string) {
    setUserInfo({
      ...userInfo,
      [identifier]: value,
    });
  }

  const passUserInfo = () => {
    let allCorrect = true;
    for (const key in userInfo) {
      if (key !== "id")
        if (userInfo[key as keyof typeof userInfo] === "") {
          allCorrect = false;
        }
    }

    if (allCorrect) {
      props.onSaveUser({
        email: userInfo.email,
        mobile: userInfo.mobile,
        address: userInfo.address,
        fullName: userInfo.fullName,
        // create random number between 0 and 100
        id: Math.floor(Math.random() * (100 - 0) + 0).toString(),
      });

      // close modal
      props.onCloseModal();
    }
  };

  return {
    setValues,
    passUserInfo,
  };
};
