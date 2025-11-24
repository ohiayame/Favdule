import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getVideos } from "@/api/groupsApi";
import { useAuthStore } from "./auth";

export const useVideosStore = create(
  immer((set, get) => ({
    videos: {},

    setVideos: async (g_id) => {
      const groupData = JSON.parse(localStorage.getItem("groupData"));
      let res = null;
      if (useAuthStore.getState().user) {
        res = await getVideos(g_id, null);
      } else {
        res = await getVideos(null, groupData[g_id]);
      }
      const { yesterday, today, tomorrow } = res;
      set((state) => {
        state.videos[g_id] = { yesterday, today, tomorrow };
      });
    },

    getVideos: async (g_id) => {
      let result = get().videos?.[g_id];
      if (result == undefined) {
        await get().setVideos(g_id);
        return get().videos[g_id];
      }
      return result;
    },
  }))
);
