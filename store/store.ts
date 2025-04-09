import {atom} from "jotai";
import {Wallpaper} from "@/hooks/fetchWallpapers";

export const selectedWallpaperAtom = atom<Wallpaper | null>(null);