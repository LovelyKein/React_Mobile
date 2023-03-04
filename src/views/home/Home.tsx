import styled from 'styled-components';

const StyleComponent = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`

/* components */
import TopHeader from '@/components/topHeader/TopHeader'

export default function Home() {
  return (
    <StyleComponent>
      <TopHeader />
    </StyleComponent>
  );
}
