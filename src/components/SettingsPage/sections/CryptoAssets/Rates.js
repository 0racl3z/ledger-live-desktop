// @flow

import React, { PureComponent } from 'react'
import { Trans, translate } from 'react-i18next'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import type { CryptoCurrency } from '@ledgerhq/live-common/lib/types'
import type { Currency } from '@ledgerhq/live-common/src/types'
import type { T } from 'types/common'
import { currenciesSelector } from 'reducers/accounts'
import IconActivity from 'icons/Activity'
import IconInfoCircle from 'icons/InfoCircle'
import {
  counterValueExchangeSelector,
  counterValueCurrencySelector,
  intermediaryCurrency,
} from 'reducers/settings'
import Text from 'components/base/Text'
import Box from 'components/base/Box'
import Tooltip from 'components/base/Tooltip'
import RateRow, { RateRowWrapper } from './RateRow'
import {
  SettingsSection as Section,
  SettingsSectionHeader as Header,
  SettingsSectionBody as Body,
} from '../../SettingsSection'

type Props = {
  currencies: CryptoCurrency[],
  counterValueCurrency: Currency,
  counterValueExchange: string,
  t: T,
}

const mapStateToProps = createStructuredSelector({
  currencies: currenciesSelector,
  counterValueCurrency: counterValueCurrencySelector,
  counterValueExchange: counterValueExchangeSelector,
})

const Circle = styled.div`
  height: ${p => p.size}px;
  width: ${p => p.size}px;
  border-radius: ${p => p.size}px;
  background-color: ${p => p.theme.colors[p.color]};
`

const RateTooltipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > ${Circle} {
    margin-right: 4px;
  }
  > ${Circle}:not(:first-of-type) {
    margin-left: 16px;
  }
`

const TooltipButtonWrapper = styled.div`
  color: ${p => p.theme.colors.grey};
  margin-left: 8px;
  display: flex;
  align-items: center;
`

const RateTooltip = () => (
  <RateTooltipWrapper>
    <Circle size={8} color="wallet" />
    <Text>
      <Trans i18nKey="settings.rates.cryptoToFiat" />
    </Text>
    <Circle size={8} color="identity" />
    <Text>
      <Trans i18nKey="settings.rates.cryptoToCrypto" />
    </Text>
  </RateTooltipWrapper>
)

class Rates extends PureComponent<Props> {
  render() {
    const { t, currencies, counterValueExchange, counterValueCurrency } = this.props

    return (
      <Section>
        <Header
          icon={<IconActivity size={16} />}
          title={t('settings.tabs.rates')}
          desc={t('settings.rates.desc')}
        />
        <Body>
          <RateRowWrapper>
            <Box ff="Open Sans|SemiBold" alignItems="center" horizontal color="dark" fontSize={4}>
              {'Rate'}
              <TooltipButtonWrapper>
                <Tooltip render={RateTooltip}>
                  <IconInfoCircle size={12} />
                </Tooltip>
              </TooltipButtonWrapper>
            </Box>
            <Box ff="Open Sans|SemiBold" color="dark" fontSize={4}>
              {'Price'}
            </Box>
            <Box ff="Open Sans|SemiBold" color="dark" fontSize={4}>
              {'Last 30 days'}
            </Box>
            <Box ff="Open Sans|SemiBold" color="dark" fontSize={4}>
              {'Exchange'}
            </Box>
          </RateRowWrapper>
          <RateRow
            from={intermediaryCurrency}
            to={counterValueCurrency}
            exchangeId={counterValueExchange}
          />
          {currencies
            .filter(c => c !== intermediaryCurrency)
            .map(from => (
              <RateRow key={from.id} from={from} to={intermediaryCurrency} />
            ))}
        </Body>
      </Section>
    )
  }
}

export default translate()(connect(mapStateToProps)(Rates))
