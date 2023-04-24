import '../css/page.css';
import 로그인창 from '../img/로그인창.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    postLoginAPI, registAdminAPI
} from '../apis/AdminLoginAPI'
import { decodeJwt } from '../utils/tokenUtils';

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    if (token !== null) {
        navigate('/manage');
    }

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const loginAdmin = useSelector(state => state.adminReducer);  // API 요청하여 가져온 loginMember 정보

    // 폼 데이터 한번에 변경 및 State에 저장    
    const [form, setForm] = useState({
        adminId: '',
        adminPwd: ''
    });

    useEffect(
        () => {
            if (loginAdmin.status === 200) {
                // console.log("[Login] Login SUCCESS {}", loginAdmin);
                navigate("/manage", { replace: true });
            }
        },
        [loginAdmin]
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
    const onClickLoginHandler = () => {
        dispatch(
            postLoginAPI(form),
            navigate("/")
        );
    }

    return (
        <div>
            <img src={로그인창} style={{ height: '750px' }} />
            <div className="login-box">
                <h2>Build-Up</h2>
                <form>
                    <div className="user-box">
                        <input
                            type="text"
                            name="adminId"
                            placeholder="관리자 아이디를 입력하세요."
                            onChange={onChangeHandler}

                        />
                        <label>Id</label>
                    </div>
                    <div className="user-box">
                        <input
                            type="password"
                            name="adminPwd"
                            placeholder='관리자 비밀번호를 입력하세요.'
                            onChange={onChangeHandler}

                        />
                        <label>Password</label>
                    </div>
                    <button
                        className='btn1'
                        type='button'
                        onClick={onClickLoginHandler}
                    >
                        <a>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            로그인
                        </a>
                    </button>
                </form>
            </div>
        </div>


    );
}

export default Login;