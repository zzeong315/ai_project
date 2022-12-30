import { userAtom } from "@recoil/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { kakaoLogin } from "@services/api/user";
import { useSetRecoilState } from "recoil";
import { User } from "@type/user";

const KakaoAuth = () => {
  const setUser = useSetRecoilState(userAtom);
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  async function kakaoRequest(authCode: string) {
    const kakaoUser: User = await kakaoLogin(authCode as string);
    setUser(prev => ({ ...prev, ...kakaoUser } as any));
    router.replace("/");
  }

  useEffect(() => {
    authCode && kakaoRequest(authCode as string);
  }, [authCode]);

  return <h2>로그인 중입니다...</h2>;
};

export default KakaoAuth;
