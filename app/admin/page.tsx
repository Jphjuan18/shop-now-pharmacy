"use client"
import AdminEdit from "../components/adminEdit"
import AdminAdd from "../components/adminAdd"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function Admin() {
  const [cookies, setCookie, removeCookie] = useCookies(['uid', 'isAuth']);
  const [isUid, setIsUid] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAuth(cookies.isAuth === 'true');
    setIsUid(cookies.uid);
  }, [cookies]);

  useEffect(() => {
    const adminTokens = process.env.NEXT_PUBLIC_ADMIN_VARIABLES_TOKENS ? process.env.NEXT_PUBLIC_ADMIN_VARIABLES_TOKENS.split(',') : [];

    if (!adminTokens.includes(cookies.uid)) {
      router.push('/');
      return      
    }
    setIsAdmin(true)
  }, [cookies.uid]);

  return (
    <>
    {isAdmin?(
      <>
      <AdminAdd />
      <AdminEdit />
      </>
    ):(<div>Loading...</div>)}
    </>
  );
}