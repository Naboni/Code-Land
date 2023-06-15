import styled from 'styled-components'

export const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  `
  // flex-direction: column;
  // ${({theme}) => theme.devices.desktop} {
  //   flex-direction: row;
  // }
export const Sidebar = styled.div`
  width: 100%;
  z-index: 1000;
  `
  // width: 100%;
  // ${({theme}) => theme.devices.desktop} {
  //   width: 390px;
  // }
export const Main = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  padding: 0.8em;
  height: 77vh;
`