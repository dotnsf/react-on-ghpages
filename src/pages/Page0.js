import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Page0 = () => {
  const navigate = useNavigate();

  const ActionA = async () => {
    navigate(`${process.env.PUBLIC_URL}/a`);
  }

  const ActionB = async () => {
    navigate(`${process.env.PUBLIC_URL}/b`);
  }

  useEffect(() => {
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>ページ０</h1>
      <button onClick={ActionA} id="actionA">ページＡへ</button>
      <button onClick={ActionB} id="actionB">ページＢへ</button>
    </>
  );
};

export default Page0;
