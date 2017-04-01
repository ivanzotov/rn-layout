import React, { PureComponent, PropTypes } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  TouchableWithoutFeedback,
  View,
  Animated,
  Image,
  ScrollView,
  Dimensions,
  Text,
  Platform,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'
import ViewPager from '../ViewPager'

import { Touchable } from '../'

const deviceWidth = Dimensions.get('window').width

export default class Layout extends PureComponent {
  static propTypes = {
    navigator: PropTypes.object,
    title: PropTypes.string.isRequired,
    smallHeader: PropTypes.bool,
    closable: PropTypes.bool,
    pages: PropTypes.array,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.number,
    content: PropTypes.func,
    additions: PropTypes.func,
    noScrollPage: PropTypes.bool,
    openDrawer: PropTypes.func,
  }

  static defaultProps = {
    closable: false,
    backgroundColor: '#4db51b',
    smallHeader: false,
  }

  state = {
    tab: 0,
  }

  x = new Animated.Value(0)
  shift = new Animated.Value(0)

  scrollViews = []
  smallHeader = this.props.smallHeader || false

  componentWillMount() {
    const { height } = Dimensions.get('window')

    if (height <= 480) {
      this.smallHeader = true
    }
  }

  onTabClickHandle(tab) {
    const { noScrollPage } = this.props
    this.setState({ tab }, !noScrollPage && this.resetScrolls)
  }

  resetScrolls() {
    this.scrollViews.forEach(s => s.scrollTo({ y: 0, animated: false }))
  }

  renderContentNavigationBar() {
    const { pages, openDrawer, closable } = this.props

    const opacity = this.shift.interpolate({
      inputRange: [0, 70],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })

    const backgroundColor = this.shift.interpolate({
      inputRange: [0, 70],
      outputRange: ['rgba(0,0,0,0)', this.props.backgroundColor],
      extrapolate: 'clamp',
    })

    const opacitySmall = this.shift.interpolate({
      inputRange: [0, 70],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })

    const height = this.shift.interpolate({
      inputRange: [-150, 70],
      outputRange: [270, 50],
      extrapolate: 'clamp',
    })

    const left = this.x.interpolate({
      inputRange: [0, deviceWidth],
      outputRange: [0, deviceWidth / 2],
      extrapolate: 'clamp',
    })

    const titleY = this.shift.interpolate({
      inputRange: [0, 70],
      outputRange: [50, 0],
      extrapolate: 'clamp',
    })

    return (
      <View>
        <Animated.View
          style={[
            styles.header,
            { height, backgroundColor },
            this.smallHeader && styles.headerSmallHeader,
            !pages && styles.headerSmallNotPages,
          ]}
        >
          <View>
            <Animated.Text
              style={[
                Platform.OS === 'ios' ? styles.titleSmallIOS : styles.titleSmallAndroid,
                !pages && styles.titleNotPages,
                this.smallHeader ? styles.titleSmallShow : { opacity: opacitySmall },
              ]}
            >
              {Platform.OS === 'ios' ? this.props.title.toUpperCase() : this.props.title}
            </Animated.Text>
          </View>
          { !this.smallHeader &&
            <View>
              <Animated.Text
                style={[
                  Platform.OS === 'android' ? styles.titleAndroid : styles.titleIOS,
                  { opacity, transform: [{ translateY: titleY }] }]}
              >
                {Platform.OS === 'ios' ? this.props.title.toUpperCase() : this.props.title}
              </Animated.Text>
            </View>
          }
          {(Platform.OS === 'android' && !closable) &&
            <View style={styles.toolbarWrapper}>
              <Icon.ToolbarAndroid
                titleColor={'#fff'}
                style={styles.toolbar}
                navIconName={'md-menu'}
                onIconClicked={openDrawer}
              />
            </View>
          }
        </Animated.View>
        { pages &&
          <Animated.View style={[styles.tabs, { backgroundColor }]}>
            { pages.map((page, index) =>
              <Touchable
                rippleColor={'rgba(255,255,255,.2)'}
                pause={0}
                onPress={() => this.onTabClickHandle(index)}
                key={index}
              >
                <View style={[styles.tab, this.state.tab === index && styles.tabSelected]}>
                  <Text
                    style={[
                      Platform.OS === 'android' ? styles.tabLabelAndroid : styles.tabLabelIOS,
                      this.state.tab === index && styles.tabLabelSelected]}
                  >
                    {page.title.toUpperCase()}
                  </Text>
                  { index !== pages.length && <View style={styles.separator} /> }
                </View>
              </Touchable>
            )}
            <Animated.View
              style={[
                styles.underline,
                { width: deviceWidth / pages.length, transform: [{ translateX: left }] },
              ]}
            />
          </Animated.View>
        }
      </View>
    )
  }

  renderNavigationBar() {
    const { backgroundColor } = this.props

    if (this.smallHeader) {
      return (<View style={{ backgroundColor }}>
        {this.renderContentNavigationBar()}
      </View>)
    }

    return (
      <Image
        source={this.props.backgroundImage}
        resizeMode="cover"
        style={styles.headerImage}
      >
        {this.renderContentNavigationBar()}
      </Image>
    )
  }

  renderViewPager(pages) {
    const { noScrollPage } = this.props

    return (
      <ViewPager
        animated
        count={pages.length}
        selectedIndex={this.state.tab}
        onScroll={x =>
          Animated.timing(this.x, {
            toValue: x,
            duration: 0,
          }).start()
        }
        onSelectedIndexChange={tab => this.setState({ tab }, !noScrollPage && this.resetScrolls)}
      >
        { pages.map((page, i) =>
          <View key={i} style={styles.layout}>
            {noScrollPage ?
              <View
                ref={r => (this.scrollViews[i] = r)}
                style={styles.layoutInner}
              >
                <View
                  style={[
                    styles.layoutInnerContent,
                    this.smallHeader && styles.layoutInnerSmallHeader,
                  ]}
                >
                  {page.content()}
                </View>
              </View>
              :
              <ScrollView
                ref={r => (this.scrollViews[i] = r)}
                contentInset={{
                  bottom: Platform.OS === 'ios' ? 49 : 0,
                  top: 0,
                }}
                scrollEventThrottle={5}
                showsVerticalScrollIndicator={false}
                automaticallyAdjustContentInsets={false}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: this.shift } } }])}
                style={styles.layoutInner}
              >
                <View
                  style={[
                    styles.layoutInnerContent,
                    this.smallHeader && styles.layoutInnerSmallHeader,
                  ]}
                >
                  {page.content()}
                </View>
              </ScrollView>
            }
            {page.additions && page.additions()}
          </View>
        )}
      </ViewPager>
    )
  }

  renderContent() {
    const { content, noScrollPage } = this.props

    return (
      <View style={styles.layout}>
        {noScrollPage ?
          <View style={styles.layoutInner}>
            <View style={[styles.layoutInnerContent, styles.layoutNotPages]}>
              {content()}
            </View>
          </View>
          :
          <ScrollView
            contentInset={{
              bottom: Platform.OS === 'ios' ? 49 : 0,
              top: 0,
            }}
            scrollEventThrottle={5}
            showsVerticalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            style={styles.layoutInner}
          >
            <View style={[styles.layoutInnerContent, styles.layoutNotPages]}>
              {content()}
            </View>
          </ScrollView>
        }
      </View>
    )
  }

  render() {
    const { pages, content, closable, navigator, additions } = this.props

    return (
      <View style={styles.layoutWrap}>
        { content ? this.renderContent() : this.renderViewPager(pages) }
        { additions && additions() }
        <View style={styles.navigationBarWrap}>
          {this.renderNavigationBar()}
          { closable &&
            <TouchableWithoutFeedback onPress={() => navigator.pop()}>
              <View
                style={[
                  styles.closeWrap,
                  !pages && styles.closeWrapNotPages,
                ]}
              >
                <Ionicons name="ios-close" color={'#fff'} style={styles.close} size={30} />
              </View>
            </TouchableWithoutFeedback>
          }
        </View>
      </View>
    )
  }
}
