import PropTypes from "prop-types";
import React, { useCallback } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";
import SanitizeHTML from "./SanitizeHTML";
import { isSignedInUserVoted } from "../utils";

dayjs.extend(relativeTime);

function ThreadCard({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  onUpVote,
  onDownVote,
}) {
  const authUser = useSelector((state) => state.authUser);

  const handleVote = useCallback(
    (voteType) => (e) => {
      e.preventDefault();
      const vote = {
        threadId: id,
        upVotesBy,
        downVotesBy,
      };
      if (voteType === "up") {
        onUpVote(vote);
      } else {
        onDownVote(vote);
      }
    },
    [id, upVotesBy, downVotesBy, onUpVote, onDownVote],
  );

  return (
    <article className="thread-card">
      <div className="thread-body mb-4">
        <div className="thread-author mb-2">
          <img
            src={owner.avatar}
            alt={owner.name}
            width={24}
            className="me-2"
          />
          <span>{owner.name}</span>
        </div>
        <h2 className="fs-3 fw-bold text-body mb-0">{title}</h2>
        <time>{dayjs().to(dayjs(createdAt))}</time>
        <SanitizeHTML html={body} className="mt-2 fs-5" />
      </div>
      <div className="thread-footer d-flex fw-light gap-3 row-gap-1 flex-wrap">
        <div className="me-4">
          <i className="bi bi-hash me-0" />
          <span>{category}</span>
        </div>

        <button
          type="submit"
          onClick={handleVote("up")}
          className={
            isSignedInUserVoted({ authUser, votesBy: upVotesBy })
              ? "active"
              : ""
          }
        >
          <i
            className={`bi bi-arrow-up-circle${isSignedInUserVoted({ authUser, votesBy: upVotesBy }) ? "-fill" : ""}`}
          />
          <span>{upVotesBy.length}</span>
        </button>
        <button
          type="submit"
          onClick={handleVote("down")}
          className={
            isSignedInUserVoted({ authUser, votesBy: downVotesBy })
              ? "active"
              : ""
          }
        >
          <i
            className={`bi bi-arrow-down-circle${isSignedInUserVoted({ authUser, votesBy: downVotesBy }) ? "-fill" : ""}`}
          />
          <span>{downVotesBy.length}</span>
        </button>
      </div>
    </article>
  );
}

ThreadCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default ThreadCard;
