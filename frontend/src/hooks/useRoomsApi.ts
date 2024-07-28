import { useNavigate } from "react-router-dom";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";

import { roomsApi } from "~/apis";
import {
  RoomCreateForm,
  RoomCreateResponse,
  RoomDetail,
  RoomDetailResponse,
  RoomForm,
} from "~/models";
import { ErrorResponse } from "~/models/api";
import { Routes } from "~/routers";

type UseRoomDetailQuery = UseQueryResult<RoomDetail, ErrorResponse>;

export const useFetchRoomDetail = (id?: string): UseRoomDetailQuery => {
  const apiRequest = (id: string): Promise<AxiosResponse<RoomDetailResponse>> =>
    roomsApi.fetchRoom(id);

  return useQuery({
    queryKey: ["rooms", id],
    queryFn: async () => {
      try {
        const response = await apiRequest(id!);
        return {
          ...response.data,
          closingAt: dayjs(response.data.closingAt),
        };
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

type UseRoomCreateMutation = UseMutationResult<
  AxiosResponse<RoomCreateResponse>,
  ErrorResponse,
  RoomCreateForm
>;

export const useCreateRoom = (): UseRoomCreateMutation => {
  const navigate = useNavigate();

  const apiRequest = (
    postData: RoomCreateForm
  ): Promise<AxiosResponse<RoomCreateResponse>> =>
    roomsApi.createRoom(postData);

  return useMutation({
    mutationFn: apiRequest,
    onSuccess: (response) => {
      const roomId = response.data.roomId;
      navigate(Routes.rooms.detail.replace(":id", roomId));
    },
  });
};

type UseRoomUpdateMutation = UseMutationResult<
  RoomDetail,
  ErrorResponse,
  { id: string; postData: RoomForm },
  unknown
>;

export const useUpdateRoom = (): UseRoomUpdateMutation => {
  const apiRequest = async ({
    id,
    postData,
  }: {
    id: string;
    postData: RoomForm;
  }): Promise<RoomDetail> => {
    const result = await roomsApi.updateRoom(id, postData);

    return {
      ...result.data,
      closingAt: dayjs(result.data.closingAt),
    };
  };

  return useMutation({
    mutationFn: apiRequest,
  });
};

type UseRoomDeleteMutation = UseMutationResult<
  AxiosResponse<void>,
  ErrorResponse,
  { id: string },
  unknown
>;

export const useDeleteRoomMutation = (): UseRoomDeleteMutation => {
  const apiRequest = async ({
    id,
  }: {
    id: string;
  }): Promise<AxiosResponse<void>> => roomsApi.deleteRoom(id);

  return useMutation({
    mutationFn: apiRequest,
  });
};
