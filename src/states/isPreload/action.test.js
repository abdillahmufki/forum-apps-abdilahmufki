/**
 * skenario test
 *
 * - asyncPreloadProccess thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { asyncPreloadProccess, setIsPreloadActionCreator } from "./action";
import { setAuthUserActionCreator } from "../authUser/action";

const fakeUserResponse = {
  id: "john_doe",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://generated-image-url.jpg",
};

describe("asyncPreloadProccess thunk", () => {
  beforeEach(() => {
    // eslint-disable-next-line no-self-assign
    api.getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    // eslint-disable-next-line no-self-assign
    api.getOwnProfile = api.getOwnProfile;
    delete api.getOwnProfile;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.resolve(fakeUserResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProccess()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(setAuthUserActionCreator(fakeUserResponse));
    expect(dispatch).toBeCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it("should dispatch action correctly when data fetching failed", async () => {
    // arrange
    api.getOwnProfile = () => Promise.reject(new Error());

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProccess()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});
