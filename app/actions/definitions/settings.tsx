import { SunIcon, MoonIcon, BrowserIcon } from "outline-icons";
import * as React from "react";
import stores from "~/stores";
import { Theme } from "~/stores/UiStore";
import { createAction } from "~/actions";
import { SettingsSection } from "~/actions/sections";

console.log(`176_app/actions/definitions/settings.tsx`);

export const changeToDarkTheme = createAction({
  name: ({ t }) => t("Dark"),
  icon: <MoonIcon />,
  iconInContextMenu: false,
  keywords: "theme dark night",
  section: SettingsSection,
  selected: () => stores.ui.theme === "dark",
  perform: () => stores.ui.setTheme(Theme.Dark),
});

export const changeToLightTheme = createAction({
  name: ({ t }) => t("Light"),
  icon: <SunIcon />,
  iconInContextMenu: false,
  keywords: "theme light day",
  section: SettingsSection,
  selected: () => stores.ui.theme === "light",
  perform: () => stores.ui.setTheme(Theme.Light),
});

export const changeToSystemTheme = createAction({
  name: ({ t }) => t("System"),
  icon: <BrowserIcon />,
  iconInContextMenu: false,
  keywords: "theme system default",
  section: SettingsSection,
  selected: () => stores.ui.theme === "system",
  perform: () => stores.ui.setTheme(Theme.System),
});

export const changeTheme = createAction({
  name: ({ t, isContextMenu }) =>
    isContextMenu ? t("Appearance") : t("Change theme"),
  placeholder: ({ t }) => t("Change theme to"),
  icon: () =>
    stores.ui.resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />,
  keywords: "appearance display",
  section: SettingsSection,
  children: [changeToLightTheme, changeToDarkTheme, changeToSystemTheme],
});

export const rootSettingsActions = [changeTheme];
