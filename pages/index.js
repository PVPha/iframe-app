import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [originStyleIframe, setOriginStyle] = useState(
        'margin-top: "1em"; width: "100%"; height: "100%"; border: "solid 1px #ccc": border-radius: "4"; overFlow: "hidden"',
    );
    useEffect(() => {
        // const wrapper = window?.parent?.document?.getElementById('HDBWrapper');
        // wrapper?.setAttribute('style', originStyle);
        window.addEventListener('message', messageHandler);

        return () => {
            window.removeEventListener('message', messageHandler);
        };
    }, []);

    const messageHandler = (event) => {
        document.querySelector('#message').innerText = typeof event.data === 'string' ? event.data : JSON.stringify(event.data);
        if (event?.data?.type === 'paramsTnC' && typeof event?.data?.params !== 'undefined') {
            onFetch(event?.data?.params);
        }
    };

    const onChangeCheckBox = (e) => {
        const checked = e.target.checked;
        window.parent.postMessage(
            {
                from: 'HDBank',
                type: 'HDBChecked',
                data: {
                    isCheck: checked,
                },
            },
            '*',
        );
    };
    const onClose = () => {
        document.querySelector('#mainWebView').style.display = 'block';
        document.querySelector('#bottomSheet').style.display = 'none';
        document.querySelector('#DHHK').style.display = 'none';
        const wrapper = window.parent.document.getElementById('HDBWebview');
        wrapper.setAttribute('style', 'margin-top: 1em; width: 100%; height: 100%; border: solid 1px #ccc: border-radius: 4; overFlow: hidden');
    };

    const onLinkClick = (type) => {
        let content = null;
        switch (type) {
            case 'link1':
                document.querySelector('#mainWebView').style.display = 'none';
                document.querySelector('#bottomSheet').style.display = 'block';
                content = {
                    link: 'https://static-cdn.hdbank.com.vn/casa/CTKM_CASA_Lucky_Draw.pdf',
                    name: 'Đề nghị kiêm hợp đồng mở và sử dụng TKTT',
                };
                type = 'link';
                break;
            case 'link2':
                content = {
                    link: 'http://localhost:8080/',
                    name: 'dịch vụ eBanking',
                    ele: window.parent.document.getElementById('HDBWebview'),
                };
                type = 'link';
                break;
            case 'link3':
                content = {
                    link: 'http://localhost:8080/',
                    name: 'HDBank Loyalty',
                };
                type = 'link';
                break;
            case 'link4':
                content = {
                    link: 'http://localhost:8080/',
                    name: 'Điều khoản, điều kiện',
                };
                type = 'link';
                break;
            case 'dialog':
                document.querySelector('#mainWebView').style.display = 'none';
                document.querySelector('#DHHK').style.display = 'block';
                const wrapper = window.parent.document.getElementById('HDBWebview');
                setOriginStyle(wrapper.style.height);
                wrapper.setAttribute(
                    'style',
                    'display: block; position: fixed; top: 50%;left: 50%;max-width: 480px;margin-inline: 16px;width: 100%;transform: translate(-50%, -50%);background-color: white;padding: 16px;border-radius: 8px;',
                );
                content = {
                    link: 'https://githubrgv8pg-0xrm--3000--5a198b5c.local-corp.webcontainer.io/dialog',
                    style: '',
                };
            default:
                break;
        }
        window.parent.postMessage({ from: 'HDBank', type: type, data: content }, '*');
    };

    const onFetch = (params) => {
        console.log('call api with params:', params);
    };

    return (
        <>
            <Head>
                <title>Iframe App</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div id='mainWebView'>
                <div className='box'>
                    <div className='pt-4px'>
                        <input type='checkbox' id='isChecked' className='checkbox' onChange={onChangeCheckBox} />
                    </div>
                    <div>
                        <label htmlFor='isChecked'>
                            <img src='logo.png' alt='' />
                            Tôi đề nghị HDBank và HD SAISON truy vấn thông tin & Tài khoản thanh toán (TKTT) của tôi tại HDBank (nếu có). Tôi đề nghị mở TKTT
                            eSkyOne HDBank và cam kết:
                        </label>

                        <ul>
                            <li className='mt-16px'>
                                Đọc và đồng ý với{' '}
                                <span onClick={() => onLinkClick('link1')}>Đề nghị kiêm hợp đồng mở và sử dụng TKTT, dịch vụ eBanking, HDBank Loyalty</span> và{' '}
                                <span onClick={() => onLinkClick('link2')}>Điều khoản, điều kiện.</span>
                            </li>
                            <li className='mt-16px'>
                                Không có <span onClick={() => onLinkClick('dialog')}>Dấu hiệu Hoa Kỳ</span> và đồng ý cho HD SAISON cung cấp thông tin của tôi
                                cho HDBank để mở TKTT.
                            </li>
                        </ul>
                    </div>
                </div>
                <h3>The message from the parent appears below:</h3>
                <div className='code'>
                    <code id='message'>Please send some message from the input above.</code>
                </div>
            </div>
            <div id='DHHK' style={{ display: 'none' }}>
                <div id='modal' class='modal'>
                    <div class='backdrop'></div>
                    <div class='modal__content'>
                        <div class='modal__header' style={{ display: 'flex', alignItems: 'center' }}>
                            <i class='material-icons-outlined' style={{ marginRight: '16px' }}>
                                info
                            </i>
                            <div class='modal__title' style={{ flexGrow: 1, fontSize: '20px', fontWeight: 'bold' }}>
                                Các dấu hiệu hoa kỳ
                            </div>
                            <button onClick={onClose}>dong</button>
                        </div>
                        <div class='modal__body' style={{ overflowY: 'auto' }}>
                            <ul
                                class='ul'
                                style={{
                                    listStyleType: 'disc',
                                    marginLeft: 0,
                                    paddingLeft: '1.5rem',
                                    lineHeight: '1.5',
                                }}>
                                <li>Là công dân Hoa Kỳ</li>
                                <li>Là đối tượng cư trú tại Hoa Kỳ</li>
                                <li>Nơi sinh tại Hoa Kỳ</li>
                                <li>Có SĐT liên lạc tại Hoa Kỳ</li>
                                <li>Có địa chỉ nhận thư bao gồm hợp thư bưu điện và địa chỉ thường trú tại Hoa Kỳ</li>
                                <li>Hướng dẫn hiện hành để chuyển tiền vào tài khoản được duy trì ở Hoa Kỳ</li>
                                <li>Giấy ủy quyền hoặc ủy quyền ký tên hiện đang có hiệu lực cấp cho người có địa chỉ ở Hoa Kỳ</li>
                                <li>Địa chỉ nhận thư hộ hoặc giữ thư tại Hoa Kỳ</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div
                id='bottomSheet'
                style={{
                    display: 'none',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50vh',
                    backgroundColor: 'gray',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    overflowY: 'auto',
                }}>
                <button onClick={onClose}>dong</button>
            </div>
        </>
    );
}
