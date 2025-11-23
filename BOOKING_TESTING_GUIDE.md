# Parcel Booking System - Quick Start & Testing Guide

## 🚀 Getting Started (3 Steps)

### Step 1: Start the Backend
```bash
cd Backend
npm start
```
✅ You should see: `Server is running on port 5000`

### Step 2: Start the Admin Portal
```bash
cd Admin
npm run dev
```
✅ You should see: `http://localhost:5173/`

### Step 3: Start the Frontend
```bash
cd Frontend
npm run dev
```
✅ You should see: `http://localhost:5174/`

---

## 📋 Initial Setup (Important!)

### Create Test Branches First
1. Open Admin Portal: `http://localhost:5173/`
2. Use demo credentials:
   - Email: `admin@shipfloww.com`
   - Password: `admin123`
3. Go to **Branches** tab (left sidebar)
4. Click **Add Branch** and create at least 2 branches:

**Branch 1**: 
- Name: New York Hub
- City: New York
- State: NY
- Address: 123 Main St, New York
- Phone: 212-555-0001

**Branch 2**:
- Name: Los Angeles Hub
- City: Los Angeles
- State: CA
- Address: 456 Park Ave, Los Angeles
- Phone: 213-555-0002

✅ **Note**: You must have at least 2 branches before testing bookings!

---

## 🧪 Testing Scenarios

### Scenario 1: User Books a Parcel

#### Steps:
1. Open Frontend: `http://localhost:5174/`
2. Click **"Book Parcel"** button (green, on homepage)
3. Fill the booking form with:

```
SENDER DETAILS:
- Name: John Doe
- Email: john@example.com
- Phone: 212-555-1234
- City: New York

RECIPIENT DETAILS:
- Name: Jane Smith
- Email: jane@example.com
- Phone: 213-555-5678
- City: Los Angeles

PARCEL DETAILS:
- Weight: 2.5 kg
- Pickup City: New York
- Delivery City: Los Angeles
- Note: Handle with care - fragile items

BRANCHES:
- Origin: New York Hub
- Destination: Los Angeles Hub
```

4. Click **"Submit Booking"**
5. ✅ Should see: "Order submitted successfully! Your Request ID is: ORD-..."
6. **Save the Request ID** - user would use this for tracking
7. Modal auto-closes after 3 seconds

#### Expected Result:
- Order created in database
- Request ID generated uniquely
- Success message shows Request ID
- Modal closes automatically
- User can now track with Request ID

---

### Scenario 2: Admin Reviews Orders

#### Steps:
1. Stay in Admin Portal: `http://localhost:5173/`
2. Look for **"Orders Received"** in left sidebar (under Management)
3. Click it - should see your booking in table
4. Verify table columns display:
   - Request ID: ORD-...
   - Sender Name: John Doe
   - Receiver Name: Jane Smith
   - From: New York
   - To: Los Angeles
   - Date: Today's date
5. Click **"View"** button on your order

#### Expected Result:
- Table shows all pending orders
- Correct sender/receiver names
- Date displays properly
- View button opens detail modal

---

### Scenario 3: Admin Reviews Order Details

#### Modal Contents (after clicking View):
1. **Header** shows: "Order Details" with Request ID
2. **Sender Section**:
   - Name: John Doe
   - Email: john@example.com
   - Phone: 212-555-1234
   - City: New York
3. **Recipient Section**:
   - Name: Jane Smith
   - Email: jane@example.com
   - Phone: 213-555-5678
   - City: Los Angeles
4. **Parcel Section**:
   - Weight: 2.5 kg
   - From: New York
   - To: Los Angeles
   - Note: Handle with care - fragile items
5. **Branch Cards**:
   - **Origin Branch** (green border):
     - New York Hub
     - 123 Main St, New York
     - New York, NY
     - 📞 212-555-0001
   - **Destination Branch** (red border):
     - Los Angeles Hub
     - 456 Park Ave, Los Angeles
     - Los Angeles, CA
     - 📞 213-555-0002
6. **Cost Input**: Empty text field at bottom
7. **Buttons**: "Approve & Create Parcel", "Reject Order", "Close"

#### Expected Result:
- All information displays correctly
- Branch information complete with addresses
- Cost input field ready for entry

---

### Scenario 4: Admin Approves Order & Creates Parcel

#### Steps (continuing from Scenario 3):
1. In detail modal, scroll to **Cost Input** field
2. Enter parcel cost: `150` (any value you want)
3. Click **"Approve & Create Parcel"** button
4. Wait for response (should be quick)

#### Expected Result:
- ✅ Success toast: "Order approved and parcel created successfully!"
- Modal closes
- Table refreshes
- Order **disappears** from pending list (status changed to Approved)
- **Green check icon** might show (if implemented)

#### Verify Parcel Created:
1. Click **"Parcels"** tab in admin sidebar
2. Search for the new parcel:
   - Sender Name: John Doe
   - Recipient Name: Jane Smith
   - Status: Pending (should show as "Pending" - status 1)
   - Cost: 150 (what you entered)
   - Branches: New York Hub → Los Angeles Hub
3. ✅ Parcel should be in the list!

---

### Scenario 5: Admin Rejects Order

#### Steps:
1. Go back to **"Orders Received"** tab
2. Create **another booking** from frontend (Book Parcel button)
3. Fill form again with different data:
```
SENDER: Alice Johnson (alice@email.com, 555-1111, Boston)
RECIPIENT: Bob Wilson (bob@email.com, 555-2222, Seattle)
WEIGHT: 1.5 kg
FROM: Boston
TO: Seattle
BRANCHES: New York Hub → Los Angeles Hub (for testing)
```
4. Back in Admin Orders page, click **"Reject"** on this order
5. Confirmation dialog appears: "Are you sure you want to reject this order?"
6. Click **"Yes"** or confirm

#### Expected Result:
- ✅ Success toast: "Order rejected and deleted"
- Order **disappears** from table immediately
- Order **not** in database anymore
- **NOT** created as parcel

---

### Scenario 6: Form Validation Tests

#### Test 6A: Missing Required Fields
1. Open Book Parcel modal
2. Leave **Sender Name** empty
3. Click **"Submit Booking"**
4. ✅ Error toast: "Please fill in all required fields"
5. Form **doesn't submit**

#### Test 6B: Same Branch Error
1. Open Book Parcel modal
2. Fill form normally
3. **Select same branch** for Origin AND Destination:
   - Both: "New York Hub"
4. Click **"Submit Booking"**
5. ✅ Error toast: "Origin and destination branches must be different"
6. Form **doesn't submit**

#### Test 6C: Invalid Weight
1. Open Book Parcel modal
2. Enter weight: `0` or `-5` or `abc`
3. Try to submit
4. ✅ Error: "Please enter a valid weight"

#### Test 6D: Email Validation
1. Open Book Parcel modal
2. Enter invalid email (e.g., "notanemail")
3. Browser shows: "Please include an @ in the email address"
4. ✅ Form cannot submit

---

### Scenario 7: Admin Stats Dashboard

#### On Orders Received Page:
1. Should see **4 stat cards** at top:
   - **Total Orders**: Count of all orders
   - **Pending**: Count with status "Pending"
   - **Approved**: Count with status "Approved"
   - **Rejected**: Count with status "Rejected" (if implemented)

2. After approving an order:
   - **Total Orders**: stays same
   - **Pending**: decreases by 1
   - **Approved**: increases by 1

3. After rejecting an order:
   - **Total Orders**: decreases by 1
   - **Pending**: decreases by 1

#### Expected Result:
- Stats update correctly
- Cards show accurate counts
- Different colors for each status

---

### Scenario 8: Form Visibility & UX

#### Modal Elements:
1. **Header**: Yellow gradient with "Book a Parcel" title and close button
2. **Sections**: 4 clearly separated sections with icons
   - 👤 Sender Details (4 fields)
   - 👤 Recipient Details (4 fields)
   - 📦 Parcel Details (3 fields + optional note)
   - 📍 Branch Selection (2 dropdowns)
3. **Buttons**: Two at bottom
   - "Submit Booking" (yellow/green gradient)
   - "Cancel" (gray)
4. **Styling**: Professional, consistent with admin UI

#### Expected Result:
- Modal responsive on all screen sizes
- Fields easily readable
- Form sections logically organized
- Buttons prominent and clickable

---

### Scenario 9: Request ID Persistence

#### Steps:
1. Book a parcel and get Request ID (e.g., ORD-1234567890-5678)
2. Note this ID down
3. Open **Browser DevTools** → Console
4. Run: `localStorage.setItem('lastRequestId', 'ORD-...')`
5. Verify it's saved
6. Later, user could reference this ID

#### Expected Result:
- Request IDs are unique (each booking gets different ID)
- Format: ORD-{timestamp}-{random}
- Can be used for order tracking

---

## 🔍 Verification Checklist

### Frontend Checks
- [ ] Book Parcel button visible on homepage
- [ ] Button color is green
- [ ] Button has icon and text
- [ ] Modal opens on button click
- [ ] Modal has all form sections
- [ ] Form fields editable
- [ ] Dropdowns populated with branches
- [ ] Submit button works
- [ ] Cancel button closes modal
- [ ] Success message shows Request ID
- [ ] Modal auto-closes after success
- [ ] Form resets after submission

### Admin Checks
- [ ] Orders tab visible in sidebar
- [ ] Orders page loads without errors
- [ ] Table shows pending orders
- [ ] Stats cards display
- [ ] View button opens modal
- [ ] Detail modal shows all information
- [ ] Cost input visible and editable
- [ ] Approve button works
- [ ] Reject button works with confirmation
- [ ] Order disappears after approval/rejection
- [ ] Table refreshes automatically

### Data Checks
- [ ] Order saved with correct data
- [ ] RequestId unique and formatted
- [ ] Status set to "Pending" initially
- [ ] Branches properly linked
- [ ] Parcel created with order data
- [ ] Parcel weight matches order weight
- [ ] Parcel sender/recipient match order
- [ ] Branch references in parcel correct
- [ ] Cost properly stored

### UI/UX Checks
- [ ] Consistent color scheme
- [ ] Professional styling
- [ ] Responsive design (test on mobile)
- [ ] Icons display properly
- [ ] Text readable
- [ ] Buttons have hover effects
- [ ] Error messages clear
- [ ] Success messages informative
- [ ] Loading states show

---

## 📊 Test Data Summary

### Recommended Test Cases

| Test # | Description | Expected Result |
|--------|-------------|-----------------|
| 1 | Book parcel with valid data | Order created, Request ID shown |
| 2 | Admin reviews order | Details display correctly |
| 3 | Admin approves order | Parcel created, order removed |
| 4 | Admin rejects order | Order deleted, not created as parcel |
| 5 | Missing required fields | Validation error shown |
| 6 | Same branch selected | Error message shown |
| 7 | Invalid weight | Validation error |
| 8 | Modal opens/closes | Smooth transitions |
| 9 | Multiple bookings | Each gets unique ID |
| 10 | Browser refresh | Parcel persists in database |

---

## 🐛 Troubleshooting

### Issue: Book Parcel button not visible
**Solution**: Verify Frontend running at localhost:5174 and Home.jsx updated

### Issue: Modal doesn't open
**Solution**: Check browser console for errors, verify BookParcelModal imported

### Issue: Branches not showing in dropdown
**Solution**: Create branches in admin first, verify at localhost:5173

### Issue: Orders page is empty
**Solution**: Book a parcel first, verify backend running, check MongoDB

### Issue: Parcel not created after approval
**Solution**: Enter cost value, check backend logs, verify branch references

### Issue: Request ID not showing
**Solution**: Verify order saved successfully in database

### Issue: Stats cards show wrong numbers
**Solution**: Refresh page, check order status values in database

### Issue: Modal not closing after approval
**Solution**: Check browser console for errors, verify API response success

---

## 💾 Database Inspection

### View Orders Collection
```bash
# In MongoDB or Atlas
db.orders.find({})

# Should show documents like:
{
  "_id": ObjectId(...),
  "requestId": "ORD-...",
  "senderName": "John Doe",
  "status": "Pending",
  "originBranch": ObjectId(...),
  "destinationBranch": ObjectId(...),
  "createdAt": ISODate(...)
}
```

### View Parcels Created from Orders
```bash
db.parcels.find({ "createdAt": { "$gt": ISODate("2025-11-23") } })

# Should show parcels with:
- from, to matching order cities
- sendername, recipientname from order
- status: 1 (Pending)
- originBranch, destinationBranch set
- cost: (what admin entered)
```

---

## ✅ Success Criteria

Your implementation is working correctly if:

1. ✅ Users can open Book Parcel modal from homepage
2. ✅ Modal has all form fields organized by section
3. ✅ Form validates required fields
4. ✅ Form prevents same branch selection
5. ✅ Form submits and creates order
6. ✅ Request ID generated and displayed
7. ✅ Admin can see Orders Received tab
8. ✅ Orders table shows pending orders
9. ✅ Admin can view order details
10. ✅ Admin can enter cost and approve
11. ✅ Parcel created with correct data
12. ✅ Order status changes to Approved
13. ✅ Order removed from pending list
14. ✅ Parcel appears in Parcels tab
15. ✅ Admin can reject orders
16. ✅ Rejections delete order without creating parcel

---

## 🎯 Next Steps (After Testing)

### If All Tests Pass:
1. ✅ Feature is production-ready
2. Deploy to staging environment
3. Test with real user scenarios
4. Gather feedback

### If Issues Found:
1. Check troubleshooting section
2. Review logs in browser and terminal
3. Check database collections
4. Refer to implementation guide

---

## 📞 Support References

- **Backend Documentation**: See BOOKING_SYSTEM_GUIDE.md
- **API Reference**: `/api/v1/orders` endpoints
- **Database Schema**: Order and Parcel collections
- **Frontend Components**: BookParcelModal.jsx, Home.jsx

---

**Testing Date**: _____________
**Tester Name**: _____________
**Test Status**: [ ] PASS [ ] FAIL
**Notes**: _________________________________

Last Updated: November 23, 2025
Status: ✅ Ready for Testing

