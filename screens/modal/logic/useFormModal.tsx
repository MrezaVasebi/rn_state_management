import { useEffect, useState } from "react";
import { userType } from "../../../types";

interface IFromModal {
  editedUser: userType;
  onCloseModal: () => void;
  onSaveUser: (value: userType) => void;
}

type itemType = {
  lbl: string;
  value: string;
  identifier: string;
  placeholder: string;
};

export const useFormModal = (props: IFromModal) => {
  const [btnLbl, setBtnLbl] = useState<string>("Save");

  const [formItem, setFormItem] = useState<itemType[]>([
    {
      value: "",
      lbl: "FullName",
      placeholder: "FullName",
      identifier: "fullName",
    },
    {
      value: "",
      lbl: "Mobile",
      placeholder: "Mobile",
      identifier: "mobile",
    },
    {
      value: "",
      lbl: "Email",
      placeholder: "Email",
      identifier: "email",
    },
    {
      value: "",
      lbl: "Address",
      placeholder: "Address",
      identifier: "address",
    },
  ]);

  useEffect(() => {
    let newOne = [...formItem];
    for (const key in props.editedUser) {
      if (props.editedUser[key as keyof typeof props.editedUser] !== "") {
        newOne.map((el) => {
          if (el.identifier === key) {
            el.value = props.editedUser[key as keyof typeof props.editedUser];
          }
        });

        setBtnLbl("Edit");
        setFormItem(newOne);
      }
    }
  }, [props.editedUser]);

  function setValues(identifier: string, value: string) {
    let newOne = [...formItem];
    newOne.forEach((element) => {
      if (element.identifier === identifier) {
        element.value = value;
      }
    });

    setFormItem(newOne);
  }

  const passUserInfo = () => {
    let info: userType = {
      email: "",
      mobile: "",
      address: "",
      fullName: "",
      id:
        btnLbl === "Save"
          ? Math.floor(Math.random() * (100 - 0) + 0).toString()
          : props.editedUser.id,
    };

    formItem.map((el) => {
      for (const key in info) {
        if (key === el.identifier) {
          info[key as keyof typeof info] = el.value;
        }
      }
    });

    let allFilled: boolean = true;
    for (const key in info) {
      if (info[key as keyof typeof info] === "") {
        allFilled = false;
      }

      if (!allFilled) return;
    }

    if (allFilled) {
      props.onSaveUser(info);
      props.onCloseModal(); // close modal
    }
  };

  return {
    btnLbl,
    formItem,
    setValues,
    passUserInfo,
  };
};
