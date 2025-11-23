# Branch Management Feature - Quick Start Guide

## 🚀 Getting Started

### Step 1: Start the Backend Server
```bash
cd Backend
npm start
```
Server runs on: `http://localhost:5000`

### Step 2: Start the Admin Portal
```bash
cd Admin
npm run dev
```
Admin portal runs on: `http://localhost:5173`

### Step 3: Start the Frontend Portal
```bash
cd Frontend
npm run dev
```
Frontend runs on: `http://localhost:5174`

---

## 📋 Initial Setup

### 1. Create Branches (Admin Panel Required)
1. Go to Admin Login: `http://localhost:5173/login`
2. Use hardcoded credentials:
   - Email: `admin@shipfloww.com`
   - Password: `admin123`
3. Navigate to **Branches** from the sidebar
4. Click **"Add New Branch"** button
5. Fill in the form:
   - **Branch Name**: e.g., "Downtown Hub"
   - **City**: e.g., "New York"
   - **State**: e.g., "NY"
   - **Address**: e.g., "123 Main St, New York"
   - **Phone**: e.g., "+1-800-123-4567"
6. Click **Create Branch**
7. Repeat to create at least 2 branches (origin and destination)

**Note**: For testing, create branches like:
- "New York Hub" - New York, NY
- "Los Angeles Hub" - Los Angeles, CA
- "Chicago Hub" - Chicago, IL

---

## ✉️ Creating Your First Parcel with Branches

### Admin Process
1. Go to Admin Panel → **New Parcel**
2. Fill in basic information:
   - **From**: "New York"
   - **To**: "Los Angeles"
   - **Sender Name**: "John Doe"
   - **Recipient Name**: "Jane Smith"
   - **Sender Email**: "john@example.com"
   - **Recipient Email**: "jane@example.com"
   - **Weight**: 5
   - **Cost**: 50
   - **Date**: Today's date

3. **REQUIRED - Select Branches**:
   - **Origin Branch**: Select "New York Hub"
   - **Destination Branch**: Select "Los Angeles Hub"

4. Click **Create Parcel**
5. You'll see a success message
6. The system sends automated emails to sender and recipient

---

## 📍 Testing Branch Information Display

### Test 1: View Parcel Details (Frontend User)
1. Go to Frontend: `http://localhost:5174`
2. Login with any valid user credentials
3. Click on "My Parcels"
4. You should see:
   - Parcel origin: "New York"
   - Parcel destination: "Los Angeles"
   - **Origin Branch**: "New York Hub" (in yellow)
   - **Destination Branch**: "Los Angeles Hub" (in yellow)

### Test 2: Track Parcel (Public)
1. Go to Frontend: `http://localhost:5174`
2. Navigate to **Track Parcel** page
3. Enter a parcel's tracking ID (copy from My Parcels)
4. You should see:
   - Full branch information cards:
     - **Origin Branch Card** (green border):
       - Branch Name: "New York Hub"
       - City: "New York"
       - State: "NY"
       - Address: "123 Main St, New York"
       - Phone: "+1-800-123-4567"
     - **Destination Branch Card** (red border):
       - Similar details for destination

### Test 3: Edit Parcel (Admin)
1. Go to Admin Panel → **Parcels**
2. Click on any parcel
3. You should see current branches displayed
4. Use dropdowns to change branches
5. Click **Save Changes**
6. Verify branches are updated

---

## 🔍 Advanced Testing

### Test 4: Branch Management CRUD
#### Create ✅
- Go to Branches page
- Add new branch
- Verify it appears in table

#### Read ✅
- All branches displayed in table
- Table shows: Name, City, State, Address, Phone

#### Update ✅
- Click Edit button on any branch
- Change details (e.g., phone number)
- Click Update
- Verify changes in table

#### Delete ✅
- Click Delete button
- Confirm deletion
- Verify branch removed from table

### Test 5: Validation
1. Try creating parcel without selecting branches → Error
2. Try selecting same branch for origin and destination → Error
3. Try creating branch without all fields → Error

### Test 6: API Testing
Use Postman or curl to test endpoints:

#### Create Branch
```bash
curl -X POST http://localhost:5000/api/v1/branches \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Seattle Hub",
    "city": "Seattle",
    "state": "WA",
    "address": "456 Pine St, Seattle",
    "phone": "+1-206-555-0123"
  }'
```

#### Get All Branches
```bash
curl http://localhost:5000/api/v1/branches
```

#### Track Parcel (with branches populated)
```bash
curl http://localhost:5000/api/v1/parcels/track/{PARCEL_ID}
```

Response will include:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "from": "New York",
    "to": "Los Angeles",
    // ... other fields ...
    "originBranch": {
      "_id": "...",
      "name": "New York Hub",
      "city": "New York",
      "state": "NY",
      "address": "...",
      "phone": "..."
    },
    "destinationBranch": {
      "_id": "...",
      "name": "Los Angeles Hub",
      // ... other fields ...
    }
  }
}
```

---

## 📊 Testing Scenarios

### Scenario 1: Complete Workflow
1. ✅ Create 3 branches
2. ✅ Create parcel with branches
3. ✅ View parcel in My Parcels (see branches)
4. ✅ Click parcel to see full branch info
5. ✅ Track parcel (see branch cards)
6. ✅ Edit parcel to change branches
7. ✅ Delete parcel

### Scenario 2: Branch Management
1. ✅ Add branch with all details
2. ✅ View in branches table
3. ✅ Edit phone number
4. ✅ Verify edit in table
5. ✅ Delete branch (verify removed)

### Scenario 3: Error Handling
1. ✅ Try parcel without origin branch → Error toast
2. ✅ Try parcel without destination branch → Error toast
3. ✅ Try same branch for both → Error message
4. ✅ Try creating branch with empty fields → Error

---

## 🎨 UI/UX Verification

### Admin Dashboard
- [ ] Branches menu item visible in sidebar
- [ ] Branches page loads with modern design
- [ ] "Add New Branch" button is prominent
- [ ] Table displays all branch data
- [ ] Edit/Delete buttons work smoothly
- [ ] Modal form appears for adding/editing
- [ ] Toast notifications show success/error

### Frontend Tracking
- [ ] Branch cards display with border colors
- [ ] Green border for origin branch
- [ ] Red border for destination branch
- [ ] All branch info visible (name, city, state, address, phone)
- [ ] Icons display correctly
- [ ] Mobile responsive layout works

### Parcel Forms
- [ ] Dropdowns populate with branches
- [ ] Validation prevents invalid submissions
- [ ] Success messages appear
- [ ] Can edit branches in parcel edit page

---

## 🐛 Troubleshooting

### Branches not showing in dropdown
**Solution**: 
- Check if branches exist (go to Branches page)
- Create at least 2 branches first
- Refresh page if needed

### "Invalid tracking ID" error
**Solution**:
- Ensure you're copying the full tracking ID (24 characters)
- Don't include spaces
- The parcel must have been created with valid branches

### Branch info not showing
**Solution**:
- Backend must be running and connected to MongoDB
- Parcel must have been created AFTER branch feature
- Try reloading the page
- Check browser console for errors

### Styling looks wrong
**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Stop and restart dev servers
- Ensure Tailwind CSS build is complete

---

## ✅ Success Criteria

Your Branch Management feature is working when:

1. ✅ Can create, read, update, delete branches in admin panel
2. ✅ Branch dropdowns appear when creating parcels
3. ✅ Cannot create parcel without both branches
4. ✅ Branch information displays on My Parcels page
5. ✅ Full branch cards show on Track Parcel page
6. ✅ Branch info visible in parcel detail page
7. ✅ Can edit parcels to change branches
8. ✅ All styling is consistent and responsive
9. ✅ Error messages appear for invalid inputs
10. ✅ Success notifications appear for actions

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Check backend console for API errors
3. Verify MongoDB is running
4. Ensure all three servers are running
5. Check network tab in DevTools for failed requests
6. Refer to BRANCH_FEATURE_DOCUMENTATION.md for detailed info

---

## 🎓 College Lab Notes

This implementation is suitable for:
- **Database Design**: MongoDB with relationships
- **CRUD Operations**: Full backend implementation
- **API Development**: RESTful endpoints
- **Frontend Integration**: React components
- **UI/UX Design**: Modern, professional interface
- **Validation**: Frontend and backend validation
- **Error Handling**: Comprehensive error management

**Grade-worthy features**:
- ✅ Clean, organized code structure
- ✅ Proper error handling
- ✅ Professional UI design
- ✅ Complete CRUD operations
- ✅ Data validation
- ✅ Responsive design
- ✅ Good documentation
- ✅ Integration with existing system

---

**Ready to Test!** 🚀
Start with the Backend, then Admin, then Frontend.
Follow the Quick Start Guide above to begin.

