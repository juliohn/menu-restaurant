import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WhiteLabelState {
  primaryColour: string;
  navBackgroundColour: string;
  bannerImage: string;
  locale: string;
}

const initialState: WhiteLabelState = {
  primaryColour: "#4F372F",
  navBackgroundColour: "#4F372F",
  locale: "pt-BR",
  bannerImage:
    "https://preodemo.gumlet.io/usr/venue/7602/web/646fbf3abf9d0.png",
};

export const whitelabelSlice = createSlice({
  name: "whitelabel",
  initialState,
  reducers: {
    setWhiteLabelConfig: (state, action: PayloadAction<WhiteLabelState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setWhiteLabelConfig } = whitelabelSlice.actions;
