/* eslint-disable no-console */
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { HttpStatusCodes } from "../utils/enums/statusCodes";
// import { hideLoader } from "../utils/helper";
import { AppRoutings } from "@/utils/enums/appRoutings";
import { UNAUTHORIZED, SOMETHING_WENT_WRONG } from "@/utils/constants/service";
import { showToast } from "@/components/toast";
import Cookies from "js-cookie";

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let isTokenRequired = true;
    if (config.url?.includes(AppRoutings.LogIn)) {
      isTokenRequired = false;
    }
    if (isTokenRequired === true) {
      const token = Cookies.get("token");
      if (token) {
        config.headers.auth_token = `${token}`;
      }
    }

    if (config.url) {
      config.url = process.env.NEXT_PUBLIC_BASE_URL + config.url;
    }

    if (config.url) {
      config.headers["Cache-Control"] =
        "no-cache, no-store, must-revalidate, post-check=0, pre-check=0";
      config.headers.Pragma = "no-cache";
      config.headers.Expires = "0";
    }

    return config;
  },
  (error: AxiosError) => {
    // hideLoader();
    showToast(error.message, "error");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // hideLoader();
    return response;
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case HttpStatusCodes.Unauthorized:
        showToast(UNAUTHORIZED, "error");
        break;
      case HttpStatusCodes.BadRequest:
        if ((error?.response?.data as any).validation.body.message) {
          const errorArray = (
            error?.response?.data as any
          ).validation.body.message
            .split(". ")
            .map((error: string) => error.replace(/"/g, ""));
          errorArray.map((error: string) => {
            showToast(error, "error");
          });
        }
        break;
      case HttpStatusCodes.InternalServerError:
        // if (Config.env.NodeEnv === NODE_ENV_TYPES.Development) {
        //   showToast(INTERNAL_SERVER_ERROR, "error");
        // } else {
        showToast(SOMETHING_WENT_WRONG, "error");
        // }
        break;
      case HttpStatusCodes.NotFound:
        showToast(
          error.response?.data
            ? (error?.response?.data as any).message.toString()
            : error.message,
          "error"
        );
        break;
      default:
        showToast(
          error.response?.data
            ? error.response?.data?.toString()
            : error.message,
          "error"
        );
        break;
    }

    // hideLoader();

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
