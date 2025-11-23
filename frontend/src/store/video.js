import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getVideos } from "@/api/groupsApi";
import { useAuthStore } from "./auth";

const groupData = JSON.parse(localStorage.getItem("groupData"));

export const useVideosStore = create(immer((set, get) => ({
  videos: {},
  setVideos: async (g_id) => {
    let res = null;
    if (useAuthStore.getState().user) {
      res = await getVideos(g_id, null);
    } else {
      res = await getVideos(null, groupData[g_id]);
    }
    const { yesterday, today, tomorrow } = res;
    set((state) => {
      state.videos[g_id] = { yesterday, today, tomorrow };
      console.log(state.videos);
    });
  },
  getVideos: async (g_id) => {
    let result = get().videos?.[g_id];
    console.log(result);
    if (result == undefined) {
      await get().setVideos(g_id);
      console.log(get()?.videos);
      return get().videos[g_id];
    }
    return result;
  },
})));
