import React from 'react';
import { Chart } from 'react-google-charts';

function App() {
  return (
    <div className={"my-pretty-chart-container"}>
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
    </div>
  );
}

export default App;
