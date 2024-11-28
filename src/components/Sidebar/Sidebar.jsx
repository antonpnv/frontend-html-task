import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const routes = [
    { title: "Home", icon: "house", path: "/" },
    { title: "Sales", icon: "chart-line", path: "/sales" },
    { title: "Costs", icon: "chart-column", path: "/costs" },
    { title: "Payments", icon: "wallet", path: "/payments" },
    { title: "Finances", icon: "chart-pie", path: "/finances" },
    { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
    { title: "Settings", icon: "sliders", path: "/settings" },
    { title: "Support", icon: "phone-volume", path: "/support" },
];

// Themes
const lightTheme = {
    sidebarBackground: "var(--color-sidebar-background-light-default)",
    sidebarHover: "var(--color-sidebar-background-light-hover)",
    sidebarActive: "var(--color-sidebar-background-light-active)",
    textLogoDefault: "var(--color-text-logo-light-default)",
    textDefault: "var(--color-text-light-default)",
    textHover: "var(--color-text-light-hover)",
    textActive: "var(--color-text-light-active)",
    toggleButtonDefault: "var(--color-button-background-light-default)",
    toggleButtonActive: "var(--color-button-background-light-active)",
    borderContainer: "#EDF2F6",
};

const darkTheme = {
    sidebarBackground: "var(--color-sidebar-background-dark-default)",
    sidebarHover: "var(--color-sidebar-background-dark-hover)",
    sidebarActive: "var(--color-sidebar-background-dark-active)",
    textLogoDefault: "var(--color-text-logo-dark-default)",
    textDefault: "var(--color-text-dark-default)",
    textHover: "var(--color-text-dark-hover)",
    textActive: "var(--color-text-dark-active)",
    toggleButtonDefault: "var(--color-button-background-dark-default)",
    toggleButtonActive: "var(--color-button-background-dark-active)",
    borderContainer: "#313740",
};

// Styled-components
const SidebarContainer = styled.aside`
    background-color: ${(props) => props.theme.sidebarBackground};
    color: ${(props) => props.theme.textDefault};
    width: ${(props) => (props.$isOpened ? "240px" : "55px")};
    border: 4px solid ${(props) => props.theme.borderContainer};
    border-radius: 12px;
    height: 90vh;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease-in-out;
    padding: 15px;
`;

const LogoContainer = styled.header`
    display: flex;
    align-items: center;
    margin: 30px 0;
`;

const Logo = styled.img`
    margin-right: 20px;
    width: 50px;
    height: 50px;
`;

const Title = styled.h1`
    margin-right: 20px;
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => props.theme.textLogoDefault};
    transition: color 0.3s, visibility 0.3s, height 0.3s;
    display: ${(props) => (props.$isOpened ? "block" : "none")};
    visibility: ${(props) => (props.$isOpened ? "visible" : "hidden")};
    height: ${(props) => (props.$isOpened ? "auto" : "0")};
    overflow: hidden;
`;

const ToggleButton = styled.div`
    position: absolute;
    left: ${(props) => (props.$isOpened ? "16%" : "10%")};
    width: 25px;
    height: 25px;
    padding: 4px;
    border-radius: 50%;
    background-color: ${(props) => props.$isOpened
        ? props.theme.toggleButtonActive
        : props.theme.toggleButtonDefault
    };
    text-align: center;
    cursor: pointer;
    transition: right 0.3s ease-in-out, background-color 0.3s ease-in-out;

    &:hover {
        background-color: ${(props) => props.theme.toggleButtonHover};
    }
`;

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Li = styled.li`
    display: flex;
    align-items: center;
    padding: 15px;
    cursor: pointer;
    background-color: ${(props) => props.$active
        ? props.theme.sidebarActive
        : "transparent"
    };
    border-radius: 13px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.sidebarHover};
    }

    span {
        margin-left: 20px;
        position: relative;
        transform: ${(props) => (props.$isOpened ? "translateX(0)" : "translateX(-100%)")}; 
        opacity: ${(props) => (props.$isOpened ? 1 : 0)};
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        white-space: nowrap;
    }

    &:hover span {
        color: ${(props) => props.theme.textHover};
    }

    span {
        color: ${(props) => props.$active
            ? props.theme.textActive
            : props.theme.textDefault
        };
    }
`;

const Footer = styled.footer`
    margin-top: auto;
`;

export const Sidebar = ({ color }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [activeRoute, setActiveRoute] = useState("/");
    const theme = color === "dark" ? darkTheme : lightTheme;

    const handleRouteClick = (path) => {
        setActiveRoute(path);
    };

    return (
        <ThemeProvider theme={theme}>
        <SidebarContainer $isOpened={isOpened}>

            <LogoContainer>
            <Logo src={logo} alt="Logo" />
            <Title $isOpened={isOpened}>Technifly</Title>
            <ToggleButton $isOpened={isOpened} onClick={() => setIsOpened((prev) => !prev)}>
                <FontAwesomeIcon icon={isOpened ? faAngleLeft : faAngleRight} />
            </ToggleButton>
            </LogoContainer>

            <Ul>
            {routes.map((route) => (
                <Li
                key={route.title}
                $active={activeRoute === route.path}
                $isOpened={isOpened}
                onClick={() => handleRouteClick(route.path)}
                >
                <FontAwesomeIcon icon={route.icon} />
                <span>{route.title}</span>
                </Li>
            ))}
            </Ul>

            <Footer>
            {bottomRoutes.map((route) => (
                <Li
                key={route.title}
                $active={activeRoute === route.path}
                $isOpened={isOpened}
                onClick={() => handleRouteClick(route.path)}
                >
                <FontAwesomeIcon icon={route.icon} />
                <span>{route.title}</span>
                </Li>
            ))}
            </Footer>

        </SidebarContainer>
        </ThemeProvider>
    );
};

Sidebar.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]).isRequired,
};
