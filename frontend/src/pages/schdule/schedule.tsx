import * as S from "./schedule.style.ts";
import Logo from "../../components/logo.tsx";
import Button from "../../components/button";
import Util from "../../components/util.tsx";
import { ButtonWrap } from "../../components/button.style.ts";

const Schedule = () => {

	return (
	<S.Container id="schedule">
		<S.Header>
			<Logo />
			<ButtonWrap>
				<Button value="닫기" />
				<Button value="편집" />
				<Button value="저장" className="submit" />
			</ButtonWrap>
		</S.Header>
		<main>
			<Util />
		</main>
	</S.Container>
	);
};
export default Schedule;
