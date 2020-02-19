import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import domo from 'ryuu.js';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { OPEN_SNACKBAR_ERROR } from '../../redux/actionTypes';

function OrgChart() {
  const dispatch = useDispatch();
  const [orgUnits, setOrgUnits] = useState([]);
  const [orgUnitLoading, setOrgUnitLoading] = useState(true);

  useEffect(() => {
    domo.get("/data/v1/orgChart?fields=orgUnit04&filter=orgUnit04!=''&groupby=orgUnit04")
      .then(data => {
        setOrgUnits(data);
      })
      .catch(err => {
        dispatch({
          type: OPEN_SNACKBAR_ERROR,
          payload: { msg: err.name + ': ' + err.message }
        });
      })
      .finally(() => setOrgUnitLoading(false));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Autocomplete
        id="combo-box-orgunit"
        options={orgUnits}
        getOptionLabel={option => option.orgUnit04}
        loading={orgUnitLoading}
        renderInput={params => (
          <TextField
            {...params}
            label="Organization Unit"
            margin="dense"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {orgUnitLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
      <Chart
        width={'100%'}
        height={350}
        chartType="OrgChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Name', 'Manager', 'ToolTip'],
          [
            {
              v: 'Mike',
              f: 'Mike<div style="color:red; font-style:italic">President</div>',
            },
            '',
            'The President',
          ],
          [
            {
              v: 'Jim',
              f:
                'Jim<div style="color:red; font-style:italic">Vice President</div>',
            },
            'Mike',
            'VP',
          ],
          ['Alice', 'Mike', ''],
          ['Bob', 'Jim', 'Bob Sponge'],
          ['Carol', 'Bob', ''],
        ]}
        options={{
          allowHtml: true,
          allowCollapse: true
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </React.Fragment>
  );
}

export default OrgChart;
