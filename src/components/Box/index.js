import styled from "styled-components";

export const Box = styled.div`
  background: #ffffff;
  margin-bottom: 10px;
  padding: 16px;
  border-radius: 8px;

  .boxLink {
    font-size: 14px;
    color: #2e7bb4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ecf2fa;
  }
  input {
    width: 100%;
    background-color: #f4f4f4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    font-size: 0.9rem;

    ::placeholder {
      color: #333333;
      opacity: 0.7;
    }
  }

  textarea {
    width: 100%;
    background-color: #fff;
    color: #333333;
    padding: 8px 12px;
    margin-bottom: 14px;
    border-radius: 8px;
    border: 0.5px solid #c5c6ca;
    resize: vertical;

    ::placeholder {
      color: #333;
      opacity: 0.8;
    }
  }

  .submit-btn {
    border: none;
    padding: 8px 12px;
    color: #ffffff;
    border-radius: 999px;
    background-color: #6f92bb;
  }

  .option-btn {
    color: #2e7bb4;
    background-color: #d9e6f6;
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    margin-bottom: 16px;

    transition: all 0.3s;
  }

  .option-btn.active {
    background-color: #6f92bb;
    color: #ffffff;
  }

  .option-btn:not(:last-child) {
    margin-right: 16px;
  }

  .testimonials-list {
    li {
      display: flex;
      padding: 8px 0;
      border-bottom: 1px solid #c5c6ca;

      figure {
        width: 15%;
        display: flex;
        justify-content: center;

        img {
          border-radius: 50%;
        }
      }

      .content {
        padding: 0 12px;

        p {
          margin-top: 8px;
        }
      }
    }
  }
`;
