import { useEffect } from 'react';
import { getMe } from '../../api/accountApi';

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

    // accessToken 저장 후, /api/v1/users/me 요청 (테스트)
    getMe()
      .then(res => {
        console.log('getMe 응답:', res.data);
      })
      .catch(err => {
        console.error('getMe 에러:', err);
      })
      .finally(() => {
        setTimeout(() => {
          window.location.href = '/main';
        }, 100); // 5초(5000ms) 딜레이 후 이동
      });
  }, []);

  return (
    <div style={{textAlign: 'center', marginTop: '100px'}}>
      <h2>로그인 중입니다...</h2>
    </div>
  );
};

export default OAuthSuccess; 