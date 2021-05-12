import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon,
  InputGroup,
  Input,
  Form,
  FormGroup,
  UncontrolledDropdown
} from 'reactstrap';

import classnames from 'classnames';

import cx from 'classnames';
import { NavbarTypes } from '../../reducers/layout';
import { logoutUser } from '../../actions/auth';
import { STATUS } from 'react-joyride';
import { toggleSidebar, openSidebar, closeSidebar, changeActiveSidebarItem } from '../../actions/navigation';
import MenuIcon from '../../images/sidebar/Fill/MenuIcon';
import SearchIcon from '../../images/sidebar/Outline/Search';

import s from './Header.module.scss'; // eslint-disable-line css-modules/no-unused-class
import SelectRange from '../SelectRange/SelectRange';

class Header extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool.isRequired,
    sidebarStatic: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.switchSidebar = this.switchSidebar.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.doLogout = this.doLogout.bind(this);
    
    this.state = {
      menuOpen: false,
      activeFirstTab: 'tab11',
      notificationsOpen: false,
      notificationsTabSelected: 1,
      focus: false,
      run: false,
    };
  }

  componentDidMount() {
    if (window.location.href.includes('main')) {
      this.setState({ run: true })
    }
  }

  handleJoyrideCallback = (CallBackProps) => {
    const { status } = CallBackProps;

    if (([STATUS.FINISHED, STATUS.SKIPPED]).includes(status)) {
      this.setState({ run: false });
    }

  };

  start = () => {
    this.setState({
      run: true,
    });
  };

  toggleFocus = () => {
    this.setState({ focus: !this.state.focus })
  }

  toggleNotifications() {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  // collapse/uncolappse
  switchSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      const paths = this.props.location.pathname.split('/');
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join('/')));
    }
  }

  // static/non-static
  toggleSidebar() {
    this.props.dispatch(toggleSidebar());
    if (this.props.sidebarStatic) {
      localStorage.setItem('staticSidebar', 'false');
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      localStorage.setItem('staticSidebar', 'true');
      const paths = this.props.location.pathname.split('/');
      paths.pop();
      this.props.dispatch(changeActiveSidebarItem(paths.join('/')));
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }

  toggleFirstTabs(tab) {
    if (this.state.activeFirstTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }
  render() {
    const { focus } = this.state;
    const { openUsersList } = this.props;
    const navbarType = localStorage.getItem("navbarType") || 'static'


    return (
      <Navbar className={`${s.root} d-print-none g d-flex  justify-content-between ${navbarType === NavbarTypes.FLOATING ? s.navbarFloatingType : ''}`}  style={{zIndex: !openUsersList ? 100 : 0}} expand="md">

        
        <div className="d-flex">
        <NavbarBrand >
          <NavLink className={` ${s.toggleSidebar}`} id="toggleSidebar" onClick={this.toggleSidebar}>
                <span className={s.headerSvgFlipColor}>
                  <MenuIcon  maskId={1001}/>
                </span>
          </NavLink>

        </NavbarBrand>
          <Form className={`d-sm-down-none ml-5 ${s.headerSearchInput}`} inline>
          <FormGroup>
            <InputGroup onFocus={this.toggleFocus} onBlur={this.toggleFocus} className={
              cx('input-group-no-border', {'focus' : !!focus} ) 
            } style={{width:'250px'}}>
              <InputGroupAddon addonType="prepend">
                <span className={`${s.headerSvgFlipColor}`}><SearchIcon /></span>
              </InputGroupAddon>
              <Input id="search-input" placeholder="Search Dashboard" className={cx({'focus' : !!focus})} />
            </InputGroup>
          </FormGroup>
        </Form> 

        <UncontrolledDropdown className={`s.dropdown`}>
                  <DropdownToggle nav caret
                                  className={classnames({
                                    active: this.state.activeFirstTab === 'tab13' ||
                                    this.state.activeFirstTab === 'tab14'
                                  })}>
                    Dropdown
                  </DropdownToggle>
                  
                  <DropdownMenu>
                    <DropdownItem onClick={() => {
                      this.toggleFirstTabs('tab13');
                    }}>@fat
                    </DropdownItem>
                    <DropdownItem onClick={() => {
                      this.toggleFirstTabs('tab14');
                    }}>@mdo
                    </DropdownItem>
                  </DropdownMenu>
        </UncontrolledDropdown>
          <Button className={`${s.deleteFilter}`} color="primary">Clear</Button>
          </div>
            <div className={`mr-5 d-flex ${s.selectRange}`}>

            <SelectRange />

              </div>
  
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    navbarType: store.layout.navbarType,
    navbarColor: store.layout.navbarColor,
    openUsersList: store.chat.openUsersList,
    currentUser: store.auth.currentUser,
  };
}

export default withRouter(connect(mapStateToProps)(Header));

