# @skyux/autonumeric

### Usage

Add the autonumeric attribute to an input element.

```
<input type="text" skyAutonumeric>
```

To use a [preset](https://github.com/autoNumeric/autoNumeric#predefined-options), include the autonumericPreset attribute.

```
<input type="text" skyAutonumeric skyAutonumericLanguagePreset="dollar">
```

To use [options](https://github.com/autoNumeric/autoNumeric#options), include the autonumericOptions attribute.

```
<input type="text" skyAutonumeric [skyAutonumericOptions]="{ decimalPlaces: 5 }">
```

The preset is applied before the options if both are used.

### Global Configuration

To configure all autonumeric instances in your SPA the same way as the attribute, you can create an AutonumericConfig and supply it in the module providers.

This is not required.

```
providers: [
    {
      provide: SkyAutonumericConfig,
      useValue: new SkyAutonumericConfig('English', {
        decimalPlaces: 5
      })
    }
  ]
```

## Install dependencies and view the example

```
skyux install
skyux serve
```
