import React from "react";
import styled from "styled-components";
import MessageList from "components/MessageList";
import Aside from "components/Aside/Aside";
import Nav from "components/Nav/Nav";

const MainFrameStyle = styled.div`
  .main__frame {
    display: grid;
    grid-template-columns: 300px minmax(500px, 820px) minmax(300px, 380px);
    grid-template-rows: 1fr;
    grid-template-areas: "a b c";
    max-width: 1500px;
    margin: 0 auto;

    .sec__a {
      grid-area: a;
      z-index: 90;
    }
    .sec__b {
      grid-area: b;
      padding-bottom: 100px;
      min-width: 500px;
      padding: 0 20px;
      padding-bottom: 100px;
    }

    .sec__c {
      grid-area: c;
      max-width: 380px;
      min-width: 300px;
    }
  }

  .message__header {
    padding: 10px 0;
    color: #dcdcdc;
    background-color: rgba(30, 30, 30, 0.7);
    backdrop-filter: blur(10px);
    width: 100%;
    font-size: 24px;
    position: sticky;
    top: 0;

    small {
      font-size: 14px;
      color: #979797;
      margin-left: 10px;
    }
  }

  @media screen and (max-width: 1280px) and (min-width: 821px) {
    .main__frame {
      grid-template-columns: 300px minmax(500px, 1fr);
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
        "a b"
        "c b";
    }
    .sec__c {
    }
  }

  @media screen and (max-width: 820px) {
    .main__frame {
      grid-template-columns: 80px minmax(300px, auto) !important;
      grid-template-rows: 1fr !important;
      grid-template-areas: "a b" !important;
    }
    .sec__b {
      width: 90vw !important;
    }
    .sec__c {
      width: 0 !important;
    }
  }

  @media screen and (max-width: 414px) {
    .main__frame {
      grid-template-columns: 1fr !important;
      grid-template-rows: 1fr 70px !important;
      grid-template-areas:
        "b"
        "a" !important;
      width: 100vw !important;
    }
    .sec__a {
      width: 100vw !important;
      height: 55px !important;
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      padding: 0 !important;
    }
    .sec__b {
      width: 100vw !important;
      min-width: 100vw !important;
      padding: 0 !important;
      margin: 0 0 30px 0 !important;
    }
    .sec__c {
      width: 0 !important;
      display: none;
    }
    .message__header {
      padding-left: 10px;
    }
  }
`;

const Message = () => {
  return (
    <MainFrameStyle>
      <div className="main__frame">
        <div className="sec__a">
          <Nav />
        </div>
        <div className="sec__b">
          {/* <div className="message__header">
            메세지
            <small>Messages</small>
          </div> */}
          <MessageList />
        </div>
        <div className="sec__c">
          <Aside />
        </div>
      </div>
    </MainFrameStyle>
  );
};

export default Message;
