import { useEffect } from 'react';

const OAuthSuccess = () => {
  useEffect(() => {
    // 1. URL 쿼리 파라미터에서 accessToken 추출
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    const tokenFromParam = params.get('access_token');
    if (tokenFromParam) {
      console.log('OAuthSuccess accessToken:', tokenFromParam);
      localStorage.setItem('accessToken', tokenFromParam);
    } else {
      // 2. 쿠키에서 accessToken 추출 (백업)
      const match = document.cookie.match(/accessToken=([^;]+)/);
      if (match) {
        localStorage.setItem('accessToken', match[1]);
      }
    }
    // /main으로 리디렉션
    window.location.href = '/main';
  }, []);

  return (
    <div style={{textAlign: 'center', marginTop: '100px'}}>
      <h2>로그인 중입니다...</h2>
    </div>
  );
};

export default OAuthSuccess; 