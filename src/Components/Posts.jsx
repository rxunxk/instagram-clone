import UserIcon from "./UserIcon";
import { FaEllipsisH } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  PostContainer,
  PostHeader,
  PostAuthorNTime,
  PostAuthor,
  PostTime,
  PostMenuBtn,
  PostCaption,
  PostMedia,
  PostFooter,
  IconWrapper,
  HeartIcon,
  CommentIcon,
  ShareIcon,
  SaveIcon,
  LikeCount,
} from "../StyledComponents/PostsStyledComponents";
import { useSelector, useDispatch } from "react-redux";
import {
  showCommentDialog,
  getCommentSelectors,
} from "../redux/slices/commentSlice";

const BASE_URL = "https://meme-api.com/gimme/CityPorn/50";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const isCommentsVisible = useSelector(getCommentSelectors);
  const dispatch = useDispatch();

  console.log(isCommentsVisible);

  useEffect(() => {
    axios.get(BASE_URL).then((response) => {
      setPosts(response.data.memes);
    });
  }, []);

  const getRandomDateAndTime = () => {
    let day = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
    let month = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    let year = Math.floor(Math.random() * (23 - 0 + 1)) + 0;
    if (year < 10) {
      year = `0${year}`;
    }

    let date = `${day}/${month}/${year}`;

    let hour = Math.floor(Math.random() * (23 - 0 + 1)) + 0;
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute = Math.floor(Math.random() * (59 - 0 + 1)) + 0;
    if (minute < 10) {
      minute = `0${minute}`;
    }

    let time = `${hour}:${minute}`;
    return `${date} at ${time}`;
  };

  const commentClickHandler = () => {
    dispatch(showCommentDialog());
  };

  if (posts.length === 0) {
    return <h3>No Memes available!</h3>;
  } else {
    return posts.map((meme, index) => {
      return (
        <PostContainer key={meme.author + index}>
          <PostHeader>
            <UserIcon
              isOnline={false}
              isStory={false}
              height={40}
              width={40}
              mr={1}
            />
            <PostAuthorNTime>
              <PostAuthor>{meme.author}</PostAuthor>
              <PostTime>{getRandomDateAndTime()}</PostTime>
            </PostAuthorNTime>
            <PostMenuBtn>
              <FaEllipsisH />
            </PostMenuBtn>
          </PostHeader>
          <PostCaption>{meme.title}</PostCaption>
          <PostMedia src={`${meme.url}`} />
          <PostFooter>
            <IconWrapper>
              <HeartIcon />
              <LikeCount>{meme.ups}</LikeCount>
            </IconWrapper>
            <IconWrapper>
              <CommentIcon onClick={commentClickHandler} />
              <LikeCount>{8}</LikeCount>
            </IconWrapper>
            <IconWrapper>
              <ShareIcon />
            </IconWrapper>
            <SaveIcon />
          </PostFooter>
        </PostContainer>
      );
    });
  }
};

export default Post;
