import { atom } from "recoil";

export const LoginSignupAtom = atom({
  key: "LoginSignupAtom",
  default: false,
});

export const SignUpAtom = atom({
  key: "SignUpAtom",
  default: false,
});

export const InsideLoginAtom = atom({
  key: "InsideLoginAtom",
  default: false,
});

export const RoleAtom = atom({
  key: "RoleAtom",
  default: "",
});

export const UserNameAtom = atom({
  key: "UserNameAtom",
  default: "",
});

export const LoadingAtom = atom({
  key: "LoadingAtom",
  default: false,
});
