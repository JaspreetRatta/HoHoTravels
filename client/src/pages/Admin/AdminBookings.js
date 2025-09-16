import { message, Modal, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import BusForm from "../../components/BusForm";
import PageTitle from "../../components/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { useReactToPrint } from "react-to-print";

function Bookings() {
  const { users } = useSelector((state) => ({ ...state }));
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const COMMISSION = 70; // 70 THB commission
  const [totalEarnings, setTotalEarnings] = useState(0);
  const dispatch = useDispatch();
  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "https://hohoo-travels.vercel.app/api/bookings/get-all-bookings",
        "https://hohoo-travels.vercel.app/api/bookings/get-bookings-by-user-id",

        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  const columns = [
   
  
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Booked on",
      dataIndex: "createdAt",
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        return formattedDate;
      }
    },

    {
      title: "Price",
      dataIndex: "fare",
      key: "bus",
    },

    {
      title: "Snacks",
      dataIndex: "commission",
      render: () => `฿${COMMISSION}`, 
    },
  

{
    title: "Discount",
    dataIndex: "discount", 
    key: "discount",
    render: (discount) => {
      
      return discount ? `฿${discount}` : 'None';
    },
  },

    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(", ");
      },
    },
    {
      title: "",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <p
            className="text-md underline"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
           Details

          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  useEffect(() => {
    const earnings = bookings.reduce((acc, booking) => {
      return acc + (booking.fare * booking.seats.length);
    }, 0);
    setTotalEarnings(earnings);
  }, [bookings]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <PageTitle title="Bookings" />
      <div className="mt-2">
      <h4>Total Earnings: ฿{totalEarnings}</h4>
        <Table dataSource={bookings} columns={columns} />
      </div>
   
      {showPrintModal && (
        <Modal
          title="Bus Details"
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          visible={showPrintModal}
          okText="Print"
          onOk={handlePrint}
        >
          <div className="d-flex flex-column p-3" ref={componentRef}/>
            <p> User : {selectedBooking.user.name}</p>
            <p>
              {selectedBooking.from} - {selectedBooking.to}
            </p>
            <hr />

          

          <div ref={componentRef}>
           
            <hr />
            <p>
              <span>Journey Date:</span>{" "}
              {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
            </p>
            <p>
              <span>Journey Time:</span> {selectedBooking.departure}
            </p>
            <hr />
            <p>
              <span>Seat Numbers:</span> <br />
                {selectedBooking.seats.join(', ')}
            </p>
            <hr />
            <p>
              <span>Total Amount:</span>{" "}
              {(selectedBooking.fare + COMMISSION) * selectedBooking.seats.length - selectedBooking.discount} THB
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Bookings;

