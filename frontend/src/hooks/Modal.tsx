import { ModalBox, ModalWrap } from './Modal.style';
import Close from '../assets/close.svg?react';
import { Link } from 'react-router-dom';

export interface ModalProps {
    $view: boolean;
    onClose?: () => void;
    type?: string;
}

const Modal = ({ $view, onClose, type }: ModalProps) => {

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <ModalWrap $view={$view}>
            <ModalBox>
                <Close onClick={handleClose} />
                {
                    type === "login" ?
                        <></>
                    :
                        <>
                            <p>
                                로그인이 필요한 메뉴입니다.
                                <br />로그인 하시겠습니까?
                            </p>
                            <Link to='/login'>
                                로그인
                            </Link>
                        </>
                }
            </ModalBox>
        </ModalWrap>
    );
};

export default Modal;
