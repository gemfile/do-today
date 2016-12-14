/* @flow */

import React, { Component } from 'react';
import { ScrollView, View } from 'react-native'
import { Color, ImageView } from '../common';
import LockImage from './img/lock_circle_close.png';

type Props = {
  width: number,
  heightOfPage: number,
  scrollEnabled: boolean,
  currentPage: number,
  renderPages: () => Array<React.Element<*>>,
  onPage: (currentPage: number) => void,
  onContentHeight: (event: Object) => void,
};

type State = {
  pageCount: number,
  currentPage: number,
};

class VerticalPager extends Component {
  props: Props;
  state: State;
  scrollView: ScrollView;
  needToScroll: boolean;
  scrollOnce: boolean;

  constructor(props: Props) {
    super(props);

    this.state = {
      pageCount: 0,
      currentPage: 0,
    };
    this.scrollOnce = true;
  }

  onScroll(offset: number, heightOfPage: number) {
    const currentPage = Math.round(offset / heightOfPage);
    if (this.state.currentPage !== currentPage) {
      this.props.onPage(currentPage);
      this.setState({ currentPage });
    }
  }

  onContentSizeChange(heightOfContent: number) {
    if (heightOfContent !== 0 && this.props.heightOfPage !== 0) {
      this.setState({ pageCount: Math.round(heightOfContent / this.props.heightOfPage) })
    }
  }

  // shouldComponentUpdate(nextProps: Props, nextState: State) {
    // const { currentPage, pageCount } = this.state;
    // const {
    //   currentPage: nextCurrentPage,
    //   pageCount: nextPageCount,
    //  } = nextState;
    //
    // const { width, heightOfPage } = this.props;
    // const {
    //   width: nextWidth,
    //   heightOfPage: nextHeightOfPage,
    // } = nextProps;
    //
    // return (
    //   pageCount !== nextPageCount ||
    //   currentPage !== nextCurrentPage ||
    //   width !== nextWidth ||
    //   heightOfPage !== nextHeightOfPage
    // );
  // }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { currentPage, heightOfPage } = this.props;
    const { pageCount } = this.state;
    const { pageCount: prevPageCount } = prevState;

    if (!this.needToScroll && prevProps.currentPage !== currentPage) {
      this.needToScroll = true;
    }

    if (this.scrollOnce && this.needToScroll && pageCount) {
      this.scrollView.scrollTo({
        x: currentPage * heightOfPage,
        animated: false
      });
      this.scrollOnce = false;
    }

    if (currentPage >= pageCount) {
      this.scrollView.scrollTo({ x: (currentPage-1) * heightOfPage, animated: false });
    }

    if (pageCount !== 0 && prevPageCount !== 0 && pageCount > prevPageCount) {
      this.scrollView.scrollTo({ x: 0, animated: false });
    }
  }

  render() {
    const {
      containerStyle,
      scrollViewStyle,
      dotStyle,
      dotContainerStyle,
      activeDotStyle,
      paginationContainerStyle,
      lockImageStyle,
      lockImageContainerStyle,
    } = styles;

    const { pageCount, currentPage } = this.state;
    const { onContentHeight, width, heightOfPage, scrollEnabled } = this.props;

    const renderPagination = [];
    for(var i = 0; i < pageCount; i++) {
      const activated = i === currentPage;
      renderPagination.push(
        <View key={i} style={dotContainerStyle}>
          {
            activated && !scrollEnabled ?
            <View style={lockImageContainerStyle}>
              <ImageView imageSource={LockImage} imageStyle={lockImageStyle} />
            </View>  :
            <View style={activated ? activeDotStyle : dotStyle} />
          }
        </View>
      );
    }

    return (
      <View
        style={[
          containerStyle,
          { width: width, height: heightOfPage }
        ]}
        onLayout={onContentHeight}
      >
        <ScrollView
          scrollEnabled={scrollEnabled}
          pagingEnabled
          automaticallyAdjustContentInsets={false}
          horizontal
          removeClippedSubviews
          ref={scrollView => this.scrollView = scrollView}
          style={[
            scrollViewStyle,
            {
              width: heightOfPage,
              height: width,
              transform: [{ rotate: '90deg' }],
            }
          ]}
          onScroll={
            event => this.onScroll(event.nativeEvent.contentOffset.x, heightOfPage)
          }
          onContentSizeChange={
            contentWidth => this.onContentSizeChange(contentWidth)
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {this.props.renderPages()}
        </ScrollView>

        <View style={[ paginationContainerStyle, {height: heightOfPage} ]}>
          {renderPagination}
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    backgroundColor: Color.Background,
  },
  paginationContainerStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    flexDirection: 'column',
    justifyContent: 'center',

  },
  dotContainerStyle: {
    margin: 0
  },
  dotStyle: {
    backgroundColor: Color.Deactivated,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDotStyle: {
    backgroundColor: Color.White,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  lockImageStyle: {
    width: 14,
    height: 20,
    marginRight: 2,
    tintColor: Color.White,
  },
  lockImageContainerStyle: {
    height: 20,
    marginTop: -6,
    marginBottom: 0
  }
};

export default VerticalPager;
