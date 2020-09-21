// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Text, FocusZone } from "office-ui-fabric-react";
import { Stack, StackItem } from "office-ui-fabric-react/lib/Stack";
import React from "react";

import { DataSpecificationBlade } from "../../components/DataSpecificationBlade";
import { IWizardTabProps } from "../../components/IWizardTabProps";
import { WizardFooter } from "../../components/WizardFooter";
import { PredictionTypes } from "../../IFairnessProps";
import { localization } from "../../Localization/localization";
import { IAccuracyPickerPropsV2 } from "../FairnessWizard";

import { AccuracyTabStyles } from "./AccuracyTab.styles";
import { TileList } from "./TileList";

export interface IAccuracyPickingTabProps extends IWizardTabProps {
  accuracyPickerProps: IAccuracyPickerPropsV2;
}

export class AccuracyTab extends React.PureComponent<IAccuracyPickingTabProps> {
  public render(): React.ReactNode {
    const styles = AccuracyTabStyles();
    return (
      <Stack
        horizontal
        horizontalAlign="space-between"
        className={styles.frame}
      >
        <Stack className={styles.main}>
          <Text className={styles.header} block>
            {localization.Accuracy.header}
          </Text>
          <Text className={styles.textBody} block>
            {localization.formatString(
              localization.Accuracy.body,
              this.props.dashboardContext.modelMetadata.PredictionType !==
                PredictionTypes.Regression
                ? localization.Accuracy.binary
                : localization.Accuracy.continuous,
              this.props.dashboardContext.modelMetadata.PredictionType ===
                PredictionTypes.BinaryClassification
                ? localization.Accuracy.binary
                : localization.Accuracy.continuous,
              this.props.dashboardContext.predictions.length === 1
                ? localization.Accuracy.modelMakes
                : localization.Accuracy.modelsMake
            )}
          </Text>
          <StackItem grow={2} className={styles.itemsList}>
            <FocusZone shouldFocusOnMount={true}>
              <TileList
                items={this.props.accuracyPickerProps.accuracyOptions.map(
                  (accuracy) => {
                    return {
                      description: accuracy.description,
                      onSelect: this.props.accuracyPickerProps.onAccuracyChange.bind(
                        this,
                        accuracy.key
                      ),
                      selected:
                        this.props.accuracyPickerProps.selectedAccuracyKey ===
                        accuracy.key,
                      title: accuracy.title
                    };
                  }
                )}
              />
            </FocusZone>
          </StackItem>
          <WizardFooter
            onNext={this.props.onNext}
            onPrevious={this.props.onPrevious}
          />
        </Stack>
        <DataSpecificationBlade
          numberRows={this.props.dashboardContext.trueY.length}
          featureNames={this.props.dashboardContext.modelMetadata.featureNames}
        />
      </Stack>
    );
  }
}
