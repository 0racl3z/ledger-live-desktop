// @flow

import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Trans } from 'react-i18next'
import { getDeviceModel } from '@ledgerhq/devices'
import type { DeviceModelId } from '@ledgerhq/devices'

import { getCurrentDevice } from 'reducers/devices'
import TrackPage from 'analytics/TrackPage'
import Box from 'components/base/Box'
import Text from 'components/base/Text'
import Button from 'components/base/Button'
import { powerOff, powerOffDevice, bootOptions, recovery } from 'config/nontranslatables'
import type { StepProps } from '../'

const Container = styled(Box).attrs({
  alignItems: 'center',
  fontSize: 4,
  color: 'dark',
  px: 7,
})``

const Title = styled(Box).attrs({
  ff: 'Museo Sans|Regular',
  fontSize: 5,
  mb: 3,
})``

const SubTitle = styled(Box).attrs({
  ff: 'Museo Sans|Regular',
  fontSize: 4,
  mb: 3,
})``

const Wrapper = styled(Box).attrs({
  my: 2,
})`
  width: 100%;
`

const BulletText = styled(Text).attrs({
  ff: 'Open Sans|Regular',
  color: 'smoke',
  fontSize: 2,
})``

type Props = {
  deviceModelId: DeviceModelId,
}

const StepResetDevice = ({ deviceModelId }: Props) => {
  const device = getDeviceModel(deviceModelId)
  return (
    <Container>
      <Title>
        <Trans i18nKey="manager.modal.resetTitle" />
      </Title>
      <TrackPage category="Manager" name="ResetBlueDevice" />

      <Wrapper>
        <SubTitle justifyContent="start">
          <Trans i18nKey="manager.modal.resetSteps.first" />
        </SubTitle>
        <BulletText ff="Open Sans|Regular" color="smoke" fontSize={2}>
          <Trans
            i18nKey="manager.modal.resetSteps.connect"
            values={{ deviceName: device ? device.productName : '' }}
          />
        </BulletText>
        <BulletText ff="Open Sans|Regular" color="smoke" fontSize={2}>
          <Trans i18nKey="manager.modal.resetSteps.turnOn" />
        </BulletText>
        <BulletText ff="Open Sans|Regular" color="smoke" fontSize={2}>
          <Trans i18nKey="manager.modal.resetSteps.falsePin" />
        </BulletText>
        <BulletText ff="Open Sans|Regular" color="smoke" fontSize={2}>
          <Trans i18nKey="manager.modal.resetSteps.turnOff" values={{ action: powerOffDevice }} />
        </BulletText>
        <BulletText ff="Open Sans|Regular" color="smoke" fontSize={2}>
          <Trans i18nKey="manager.modal.resetSteps.confirmTurnOff" values={{ action: powerOff }} />
        </BulletText>
      </Wrapper>

      <Wrapper>
        <SubTitle justifyContent="start">
          <Trans i18nKey="manager.modal.resetSteps.second" values={{ mode: recovery }} />
        </SubTitle>
        <BulletText ff="Open Sans|Regular" color="smoke" fontSize={2}>
          <Trans i18nKey="manager.modal.resetSteps.boot" values={{ option: bootOptions }} />
        </BulletText>
        <BulletText ff="Open Sans|Regular" color="smoke" fontSize={2}>
          <Trans i18nKey="manager.modal.resetSteps.recoveryMode" values={{ mode: recovery }} />
        </BulletText>
      </Wrapper>

      <Wrapper>
        <SubTitle justifyContent="start">
          <Trans i18nKey="manager.modal.resetSteps.third" />
        </SubTitle>
        <BulletText ff="Open Sans|Regular" color="smoke" fontSize={2}>
          <Trans i18nKey="manager.modal.resetSteps.openLive" />
        </BulletText>
        <BulletText ff="Open Sans|Regular" color="smoke" fontSize={2}>
          <Trans
            i18nKey="manager.modal.resetSteps.uninstall"
            values={{ deviceName: device ? device.productName : '' }}
          />
        </BulletText>
        <Text ff="Open Sans|Regular" color="smoke" fontSize={1}>
          <Trans i18nKey="manager.modal.resetSteps.disclaimer" />
        </Text>
      </Wrapper>
    </Container>
  )
}

const mapStateToProps = state => ({
  device: getCurrentDevice(state),
})

export function StepResetFooter({ transitionTo, t }: StepProps) {
  return (
    <Button primary onClick={() => transitionTo('idCheck')}>
      {t('common.continue')}
    </Button>
  )
}

export default connect(mapStateToProps)(StepResetDevice)
