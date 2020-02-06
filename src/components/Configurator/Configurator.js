import React from 'react';
import { Radio, AutoComplete, InputNumber, Button, Row, Col } from 'antd';
import LocalizedStrings from 'localized-strings';
import './style.css';

const strings = new LocalizedStrings({
    en:{
      btn:"Add ➕",
      radio_circle: "Circle ⚫",
      radio_square: "Square ⬛",
      placeholder: "Type in the average size..",
      heigth: "heigth",
      width: "width"
    },
    de: {
      btn:"Hinzufügen ➕",
      radio_circle: "Kreis ⚫",
      radio_square: "Viereckig ⬛",
      placeholder: "Gebe die Durschnittsgröße ein..",
      height: "höhe",
      width: "breite"
    }
});

class Configurator extends React.Component {
    state = {
        radioValue: 1,
        dataSourceDefault: ['Ø 24cm', 'Ø 26cm', 'Ø 32cm'],
        dataSourceCustom: ['Ø 24cm', 'Ø 26cm', 'Ø 32cm'],
        width: 0,
        heigth: 0,
        moneyValue: 0.0
    };
    
    onChangeRadio = (e) => {
        this.setState({
            radioValue: e.target.value,
        });
    };

    onSelectAverageSize = (value) => {
        this.setState({
            averageSize_value: value,
        });
    };

    onSearchAverageSize = (value) => {
        this.setState({
            dataSourceCustom: !value ? this.state.dataSourceDefault : [ ...this.state.dataSourceDefault, `Ø ${value}cm`],
        });
    };

    onChangeMoney = (value) => {
        this.setState({
            moneyValue: value
        })
    }

    onChangeWidth = (value) => {
        this.setState({
            width: value
        })
    }

    onChangeHeight = (value) => {
        this.setState({
            height: value
        })
    }

    render() {
        return(
            <div className="container">
                <Radio.Group
                    className="radioGroup"
                    onChange={this.onChangeRadio}
                    value={this.state.radioValue} >
                    <Radio value={1}>{`${strings.radio_circle}`}</Radio>
                    <Radio value={2}>{`${strings.radio_square}`}</Radio>
                </Radio.Group>
                <div className="containerInput">
                    {this.state.radioValue === 1
                        ? (
                            <AutoComplete
                                className="averageSize"
                                dataSource={this.state.dataSourceCustom}
                                placeholder={`${strings.placeholder}`}
                                filterOption={(inputValue, option) =>
                                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                onSelect={this.onSelectAverageSize}
                                onSearch={this.onSearchAverageSize}
                            />
                        )
                        : (
                            <div>
                                <InputNumber
                                    className="amountInput"                                   
                                    min={this.state.width}
                                    defaultValue={20}
                                    onChange={this.onChangeWidth}
                                />
                                X
                                <InputNumber
                                    className="amountInput"                               
                                    min={this.state.heigth}
                                    defaultValue={15}
                                    onChange={this.onChangeHeight}
                                />
                            </div>
                        )
                    }
                    <InputNumber
                        className="amountInput"
                        defaultValue={0.0}
                        formatter={value => `€ ${value}`}
                        onChange={this.onChangeMoney}
                    />
                </div>
                <Button className="button">{`${strings.btn}`}</Button>
            </div>
        )
    }
}
export default Configurator