/* eslint-disable quotes */
/**
 * Test scenario for isPreloadReducer
 *
 * - should return the initial state when given by unknown action
 * - should return set auth user when given by SET_AUTH_USER action
 * - should return unset auth user when given by UNSET_AUTH_USER action
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from "vitest";
import authUserReducer from "./reducer";

describe("AuthUser function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = [];
    const action = { type: "UNKNOWN" };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return set auth user when given by SET_AUTH_USER action", () => {
    // arrange
    const initialState = [];
    const action = {
      type: "SET_AUTH_USER",
      payload: {
        authUser: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it("should return unset auth user when given by UNSET_AUTH_USER action", () => {
    // arrange
    const initialState = [];
    const action = {
      type: "UNSET_AUTH_USER",
      payload: {
        authUser: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });
});
