/* @flow */

import React, { Component } from 'react';
import { ScrollView, View } from 'react-native'
import { Color } from './common';

type Props = {
  width: number,
  heightOfPage: number,
  scrollEnabled: boolean,
  renderPages: () => Array<React.Element<*>>,
  onPage: (currentPage: number) => void,
  onContentHeight: (event: Object) => void,
};

type State = {
  currentPage: number,
  pageCount: number
};

class VerticalPager extends Component {
  props: Props;
  state: State;
  scrollView: ScrollView;

  state = {
    currentPage: 0,
    pageCount: 0
  };

  componentDidMount() {
    this.props.onPage(this.state.currentPage);
  }

  onScroll(offset: number, heightOfPage: number) {
    const currentPage = Math.round(offset / heightOfPage);
    if (this.state.currentPage !== currentPage) {
      this.setState({ currentPage: currentPage });
      this.props.onPage(currentPage);
    }
  }

  onContentSizeChange(heightOfContent: number) {
    if (heightOfContent !== 0 && this.props.heightOfPage !== 0) {
      this.setState({ pageCount: Math.round(heightOfContent / this.props.heightOfPage) })
    }
  }

  // shouldComponentUpdate(nextProps: Props, nextState: State) {
  //   const { currentPage, pageCount } = this.state;
  //   const {
  //     currentPage: nextCurrentPage,
  //     pageCount: nextPageCount,
  //    } = nextState;
  //
  //   const { width, heightOfPage } = this.props;
  //   const {
  //     width: nextWidth,
  //     heightOfPage: nextHeightOfPage,
  //   } = nextProps;
  //
  //   return (
      // pageCount !== nextPageCount ||
      // currentPage !== nextCurrentPage ||
      // width !== nextWidth ||
      // heightOfPage !== nextHeightOfPage
  //   );
  // }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.pageCount !== this.state.pageCount) {
      this.scrollView.scrollTo({ x: 0 });
    }
  }

  render() {
    const {
      containerStyle,
      scrollViewStyle,
      dotStyle,
      activeDotStyle,
      paginationContainerStyle
    } = styles;

    const { onContentHeight, width, heightOfPage } = this.props;

    const renderPagination = [];
    for(var i = 0; i < this.state.pageCount; i++) {
      renderPagination.push(
        <View key={i} style={(this.state.currentPage === i) ? activeDotStyle : dotStyle} />
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
              transform: [{ rotate: '90deg' }]
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
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },
  scrollViewStyle: {
    backgroundColor: '#6A85B1',
  },
  paginationContainerStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDotStyle: {
    backgroundColor: Color.Green,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  }
};

export default VerticalPager;
