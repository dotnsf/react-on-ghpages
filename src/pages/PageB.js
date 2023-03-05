import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageB = () => {
  const navigate = useNavigate();

  const ActionA = async () => {
    navigate(`${process.env.PUBLIC_URL}/a`);
  }

  const Action0 = async () => {
    navigate(`${process.env.PUBLIC_URL}/`);
  }

  useEffect(() => {
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>ページＢ</h1>
      <button onClick={ActionA} id="actionA">ページＡへ</button>
      <button onClick={Action0} id="action0">ページ０へ</button>
    </>
  );
};

export default PageB;
