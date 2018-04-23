import React from 'react';
import { ListItem } from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentCreate from 'material-ui/svg-icons/content/create';
import StatusEnum from 'constants/statusEnum';
import Util from 'services/util';

const Todo = ({ data, deleteTodo, openEditDialog }) => (
  <ListItem
    style={{
      margin: 5,
      backgroundColor: '#f2f2f2',
      borderRight: '10px solid ' + Util.getColorForStatus(data.status),
    }}
    children={
      <div
        key={data._id}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            backgroundColor: Util.getDateColor(data.dueDate, data.status),
            padding: 5,
            color: 'white',
          }}
        >
          {Util.getReadableDateString(data.dueDate)}
        </div>
        <div style={{ flex: 1, flexDirection: 'column', paddingRight: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <p>{data.title}</p>
          </div>
          <div
            style={{
              maxWidth: 'calc(80vw - 262px)', // need to automate these calculations
              fontFamily: 'Roboto',
              fontSize: '0.9em',
              wordWrap: 'break-word',
            }}
          >
            {data.description}
          </div>
          <br />
          <div style={{ fontSize: '0.7em' }}>
            Status:{' '}
            <span style={{ color: Util.getColorForStatus(data.status) }}>
              {StatusEnum[data.status]}
            </span>
          </div>
        </div>
        <div style={{ width: 30 }}>
          <ContentCreate onClick={id => openEditDialog(data)} />
        </div>
        <div style={{ width: 30 }}>
          <ActionDelete onClick={id => deleteTodo(data._id)} />
        </div>
      </div>
    }
  />
);

export default Todo;
