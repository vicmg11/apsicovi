import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from '../components/Header';
import Meta from '../components/Meta';

const theme = {
	red: '#FF0000',
	black: '#393939',
	grey: '#3A3A3A',
	blue: '#0000ff',
	buttonBlue: '#22568D',
	lightBlue: '#3498DB90',
	darkBlue: '#2C3E50',
	deepBlue: '#00bfff',
	lightgrey: '#E1E1E1',
	offWhite: '#EDEDED',
	maxWidth: '1000px',
	radiusBorder: '10px',
	bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const StyledPage = styled.div`
	background-color: #f4f4f4;
	/* background-image: url("../static/sky1.jpeg");  The image used */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
	background-size: cover; /* Resize the background image to cover the entire container */
	height: 100vh;
	color: ${(props) => props.theme.black};
`;

const InnerContent = styled.div`
	max-width: ${(props) => props.theme.maxWidth};
	margin: 38px auto;
	padding: 1rem;
`;

injectGlobal`
  /* @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  } */
  html {
    box-sizing: border-box;
    font-size: 12px
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding-top: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
		font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
		background-color: #f4f4f4;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

class Page extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<StyledPage>
					<Meta />
					<Header />
					<InnerContent>{this.props.children}</InnerContent>
				</StyledPage>
			</ThemeProvider>
		);
	}
}

export default Page;
