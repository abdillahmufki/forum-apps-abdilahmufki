/**
 * skenario test
 *
 * - asyncReceiveLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call error toast correctly when data fetching failed
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import {
  asyncReceiveLeaderboards,
  receiveLeaderboardsActionCreator,
} from "./action";

const fakeLeaderboardsResponse = [
  {
    user: {
      id: "users-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 10,
  },
];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncReceiveLeaderboards thunk", () => {
  beforeEach(() => {
    // eslint-disable-next-line no-self-assign
    api.getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    // eslint-disable-next-line no-self-assign
    api.getLeaderboards = api.getLeaderboards;
    delete api.getLeaderboards;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it("should dispatch action and throw error when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action & assert
    await expect(asyncReceiveLeaderboards()(dispatch)).rejects.toThrowError(
      fakeErrorResponse.message,
    );
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});
