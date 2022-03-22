import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button, Select, MenuItem, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export default function Form({ inputs, callback, header, submitMsg }) {
  const classes = useStyles();
  const { register, handleSubmit, reset, watch, control, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    if (data.length !== 0) {
      callback(data);
      reset();
    }
  };
  const rewatch = watch("category");

  const inputsRender = (input, i) => {
    return (
      <>
        {input.type !== "select" ? (
          <>
            {input.type !== "range" ? (
              <TextField
                defaultValue={input.placeholder}
                error={errors[input.name] ? true : false}
                key={i}
                margin="dense"
                fullWidth
                name={input.name}
                type={input.type}
                inputRef={register({ required: true })}
                id="standard-basic"
                label={input.label}
                helperText={input.tooltip && input.tooltip}
              />
            ) : (
              <>
                <InputLabel htmlFor="range-slider" gutterBottom>
                  {input.label}
                </InputLabel>
                <Controller
                  id="range-slider"
                  name={input.name}
                  control={control}
                  defaultValue={[0, 10]}
                  onChange={([, value]) => value}
                  as={
                    <Slider marks valueLabelDisplay="auto" max={100} step={1} />
                  }
                />
              </>
            )}

            {errors[input.name] && (
              <div key={"div" + i}>{`${input.label} is required`}</div>
            )}
          </>
        ) : (
          <>
            <br />
            <InputLabel htmlFor="native-simple">{input.label}</InputLabel>
            <Controller
              as={
                <Select fullWidth>
                  {input.options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.optionName}
                    </MenuItem>
                  ))}
                </Select>
              }
              error={errors[input.name] ? true : false}
              control={control}
              id="native-simple"
              defaultValue={input.placeholder}
              inputRef={register({ required: true })}
              name={input.name}
            />
            {errors[input.name] && (
              <div key={"div" + i}>{`${input.label} is required`}</div>
            )}
          </>
        )}
      </>
    );
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {inputs["inputs"].map((input, i) => (
        <div key={`${i} inputkey`}> {inputsRender(input, i)}</div>
      ))}
      {inputs.conditions &&
        inputs.conditions.map((input, i) => (
          <>
            {input.condition === rewatch && rewatch !== undefined ? (
              <div key={`condition key ${i}`}> {inputsRender(input, i)}</div>
            ) : null}
          </>
        ))}
      <Button variant="outlined" type="submit" color="primary">
        {inputs.submitMsg}
      </Button>
    </form>
  );
}
