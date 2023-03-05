import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageA = () => {
  const navigate = useNavigate();

  const Action0 = async () => {
    navigate(`${process.env.PUBLIC_URL}/`);
  }

  const ActionB = async () => {
    navigate(`${process.env.PUBLIC_URL}/b`);
  }

  useEffect(() => {
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>ページＡ</h1>
      <button onClick={Action0} id="action0">ページ０へ</button>
      <button onClick={ActionB} id="actionB">ページＢへ</button>
    </>
  );
};

export default PageA;
